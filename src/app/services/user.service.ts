import { Injectable } from '@angular/core';
import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { User } from '../sign-up/shared/user.model';
import { environment } from 'src/environments/environment';
import { BehaviorSubject,Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../posts/posts.model';

@Injectable({ providedIn: 'root' })
export class UserService {
    public posts:Post[]=<Post[]>JSON.parse(localStorage.getItem('posts'))
    public users:User[] = <User[]>JSON.parse(localStorage.getItem('users'));
    public currentUsers:User = <User>JSON.parse(localStorage.getItem('currentUser'));
    private currentUserSubject$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(this.users);
    private loggedUserSubject$: BehaviorSubject<User> = new BehaviorSubject<User>(this.currentUsers);
    private postedtatus$:BehaviorSubject<Post[]> =new BehaviorSubject<Post[]>(this.posts) 
    public loggedUser:User=null;
    private userSubject: BehaviorSubject<User>;
    constructor(private http: HttpClient) { }
   
    public get getUsers(): Observable<User[]> {
        return this.currentUserSubject$.asObservable();
    }
    public get getCurrentUsers():Observable<User>{
        return this.loggedUserSubject$.asObservable()
    }
    
    public get getPosts():Observable<Post[]>{
        return this.postedtatus$.asObservable()
    }

    getById(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

   

    getAll() {
        return this.http.get<User[]>(`/users`);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/register`, {currentUser:user });
    }
    
    postStatus(post:Post){
        let posts:Post[]=this.getLocalStorage("posts")??[]

        posts.push(post)
        this.setLocalStorage("posts",posts)

    }
    registerUser(user: User):Promise<"success"|"user-exists"> {
        let users:User[] = this.getLocalStorage("users")??[];
        const userEmail = user.email;
        let isUniqueEmail:boolean = true;
        users.forEach((user:User)=>{
            if(user.email===userEmail.trim().toLowerCase()){
                isUniqueEmail=false;
            }
        })
        if(isUniqueEmail){
            users.push(user);
            this.setLocalStorage("users", users)
            return Promise.resolve("success");
        }else{
            return Promise.reject("user-exists");
        } 
    }

    setLocalStorage(key: string, value: any) {
        const storage = JSON.stringify(value);
        localStorage.setItem(key, storage);
        return Promise.resolve()
    }

    getLocalStorage(key: string) {
        let storage = localStorage.getItem(key);
        return JSON.parse(storage);
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`);
    }
}
