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
  // baseUrl : string = "http://localhost:8090/api-service/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  cloakHidden = new BehaviorSubject(true);
  snackBarMessage = new BehaviorSubject('Selamat Datang');

  changeCloak(value : boolean){
    setTimeout(() => {
        this.cloakHidden.next(value);
    });
  }

  changeMessage(value : string){
      this.snackBarMessage.next(value);
  }

  registerUser(value: any): Observable<any> {
    return this.http.post<any>(this.baseUrl+'register', value, this.httpOptions)
      .pipe(map(response => response));
  }

  getGraph(value: any): Observable<any> {
    let token :string = 'Bearer ' + JSON.parse(localStorage.getItem('wai'));
    
    const  httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
      })
    };
    
    return this.http.post<any>(this.baseUrl+'graph', value, httpOptions)
      .pipe(map(response => response));
  }

  login(value : any): Observable<any> {
    return this.http.post<any>(this.baseUrl+'auth', value, this.httpOptions)
      .pipe(map(response => response));
  }



}