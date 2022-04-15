import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../sign-up/shared/user.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    
    public currentUser:User = <User>JSON.parse(localStorage.getItem('currentUser'));
    private currentUserSubject$: BehaviorSubject<User> = new BehaviorSubject<User>(this.currentUser);
    

    constructor(private http: HttpClient) {}

    public get currentUserValue(): Observable<User> {
        return this.currentUserSubject$.asObservable();
    }

    login(email:string, password:string) {
        return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { email, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject$.next(user);
                return user;
            }));
    }
    update(id, params) {
        return this.http.put<any>(`${environment.apiUrl}/users/${id}`, params)
            // .pipe(map(x => {
            //     // update stored user if the logged in user updated their own record
            //     console.log(this.userValue)

            //     if (id == this.userValue.id) {
            //         // update local storage
            //         const user = { ...this.userValue, ...params };
            //         localStorage.setItem('user', JSON.stringify(user));

            //         // publish updated user to subscribers
            //         this.userSubject.next(user);
            //     }
            //     return x;
            // }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject$.next(null);
    }
}