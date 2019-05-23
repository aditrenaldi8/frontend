import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  baseUrl : string = "http://35.198.200.111/api-service/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  cloakHidden = new BehaviorSubject(true);
  snackBarMessage = new BehaviorSubject('Selamat Datang');
  latest = new BehaviorSubject({});

  changeCloak(value : boolean){
    setTimeout(() => {
        this.cloakHidden.next(value);
    });
  }

  changeMessage(value : string){
      this.snackBarMessage.next(value);
  }

  changeLatest(value){
    this.latest.next(value);
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

  initUser(): Observable<any> {
    let token :string = 'Bearer ' + JSON.parse(localStorage.getItem('wai'));
    
    const  httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
      })
    };
    
    return this.http.get<any>(this.baseUrl+'data', httpOptions)
      .pipe(map(response => response));
  }

  login(value : any): Observable<any> {
    return this.http.post<any>(this.baseUrl+'auth', value, this.httpOptions)
      .pipe(map(response => response));
  }

  getUserList(value : any): Observable<any> {
    let token :string = 'Bearer ' + JSON.parse(localStorage.getItem('wai'));
    
    const  httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
      })
    };

    return this.http.post<any>(this.baseUrl+'admin', value, httpOptions)
      .pipe(map(response => response));
  }

  getUserDetail(value : any): Observable<any> {
    let token :string = 'Bearer ' + JSON.parse(localStorage.getItem('wai'));
    
    const  httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
      })
    };

    return this.http.post<any>(this.baseUrl+'talentResultById', value, httpOptions)
      .pipe(map(response => response));
  }



}