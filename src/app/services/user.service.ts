import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../sign-up/shared/user.model';
import { environment } from 'src/environments/environment';
import { BehaviorSubject,Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
    public users:User = <User>JSON.parse(localStorage.getItem('users'));
    private currentUserSubject$: BehaviorSubject<User> = new BehaviorSubject<User>(this.users);
    public loggedUser:User=null;
    constructor(private http: HttpClient) { }
   
    public get getUsers(): Observable<User> {
        return this.currentUserSubject$.asObservable();
    }

    getAll() {
        return this.http.get<User[]>(`/users`);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/register`, {currentUser:user });
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
