import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user';

@Injectable()
export class UserService {

    private serverUrl = 'http://localhost:8000';  // URL API

    constructor(
        private http: HttpClient
        ) { }


    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.serverUrl + '/user')
            .pipe(
                tap(users => this.log(`fetched users`)),
                catchError(this.handleError('getUsers', []))
            );
    }

    getUser (id: number): Observable<User> {
        return this.http.get<User>(this.serverUrl + '/user/' + id).pipe(
            catchError(this.handleError<User>('getUser'))
        );
    }


    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    private log(message: string) {
        console.log('UserService: ' + message);
    }
}