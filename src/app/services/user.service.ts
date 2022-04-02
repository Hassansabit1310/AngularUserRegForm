import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../sign-up/shared/user.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
    public loggedUser:User=null;
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/register`, {currentUser:user });
    }
    registerUser(user: User) {
        const users:User[] = this.getLocalStorage("users");
        const userEmail = user.email;
        let isUniqueEmail:boolean = true;
        users.forEach((user:User)=>{
            if(user.email===userEmail.trim().toLowerCase())
        }) 
        return this.http.post(`${environment.apiUrl}/users/register`, {currentUser:user });
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
