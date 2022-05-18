import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User | null>;
    public currentUser: Observable<User | null>;

    constructor(private http: HttpClient) {
        let currentUserStr: string | null = localStorage.getItem('currentUser');
        if(currentUserStr){
            this.currentUserSubject = new BehaviorSubject<User | null>(JSON.parse(currentUserStr));
            
        }else{
            this.currentUserSubject = new BehaviorSubject<User | null>(null);
        }
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User | null{
        return this.currentUserSubject.value;
    }

    login(email: string, password: string) {
        return this.http.post<User>(`${environment.apiDotnetUrl}/api/Authenticate/login`, { email, password })
            .pipe(map(user => {
                console.log(user);
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}