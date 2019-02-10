import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  baseUrl : string = "http://157.230.240.55/api-service/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  cloakHidden = new BehaviorSubject(true);

  changeCloak(value : boolean){
    setTimeout(() => {
        this.cloakHidden.next(value);
    });
}

  registerUser(value: any): Observable<any> {
    return this.http.post<any>(this.baseUrl+'user', value, this.httpOptions)
      .pipe(map(response => response));
  }

  getGraph(value: any): Observable<any> {
    return this.http.post<any>(this.baseUrl+'graph', value, this.httpOptions)
      .pipe(map(response => response));
  }




}