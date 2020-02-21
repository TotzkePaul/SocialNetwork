import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        console.log("UserService - getAll");
        return this.http.get<User[]>(`/api/user`);
    }

    register(user: User) {
        console.log("UserService - register", user);
        return this.http.post(`/api/user/register`, user);
    }

    delete(id: number) {
        console.log("UserService - delete", id);
        return this.http.delete(`/api/user/${id}`);
    }
}
