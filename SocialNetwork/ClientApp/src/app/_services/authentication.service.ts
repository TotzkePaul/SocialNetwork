import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        console.log("AuthenticationService - currentUserValue", this.currentUserSubject.value);
        return this.currentUserSubject.value;
    }

    login(username, password) {
        console.log("AuthenticationService - login", username);
        return this.http.post<User>(`/api/User/login`, { "email": username, password })
            .pipe(map((user:User)  => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                let myUser :User = new User();
                myUser.email = user.email;
                myUser.token = user.token;
                myUser.id = user.id;
                localStorage.setItem('currentUser', JSON.stringify(myUser));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        console.log("AuthenticationService - logout");
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
