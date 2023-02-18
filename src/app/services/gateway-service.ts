
import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AppSettings } from './AppSettings';

@Injectable({
  providedIn: 'root'
})
export class GatewayService  {

  constructor(public http: HttpClient) { }

   /** GET heroes from the server */
   getData (url : string): Observable<any> {    
 
    const  headers = new  HttpHeaders(
      {
      'Content-Type':'application/json'        
      }) ;    
    return this.http.get<any>(AppSettings.ENDPOINT+url,{headers})
   ;
  }


  /** GET heroes from the server */
  putData (url : string, data: any): Observable<any> {    
    console.log(url);
    console.log(data);
    const  headers = new  HttpHeaders(
      {
      'Content-Type':'application/json'        
      }) ;    
    return this.http.put<any>(AppSettings.ENDPOINT+url,data,{headers})
   ;
  }

  /** GET heroes from the server */
  postData (url : string, data: any): Observable<any> {    
    console.log(url);
    console.log(data);
    const  headers = new  HttpHeaders(
      {
      'Content-Type':'application/json'        
      }) ;    
    return this.http.post<any>(AppSettings.ENDPOINT+url,data,{headers})
   ;
  }
}