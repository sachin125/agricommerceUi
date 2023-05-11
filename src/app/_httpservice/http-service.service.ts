import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from  '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import {SharedObjectService} from '../_auth/sharedobject.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  headerObj= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

  readonly basepath:string = "/api/";

  postRequest(url:string, data:any): Observable<any> {
    url = this.basepath+url;
    const jwttoken = localStorage.getItem('jwttoken');
    const headerObj1 ={
      'content-type':'application/json',
      'Access-Control-Allow-Origin': '*',
      "Authorization":"Bearer "+jwttoken
    }
   // console.log('postRequest: this.headerObj: {} ',headerObj1);
    return this.http.post(url,data, { headers: headerObj1 });
  }

  getRequest(url:string): Observable<any> {
    const jwttoken = localStorage.getItem('jwttoken');
    const headerObj1 ={
      'content-type':'application/json',
      'Access-Control-Allow-Origin': '*',
      "Authorization":"Bearer "+jwttoken
    }
    // console.log('getRequest: this.headerObj: {} ',headerObj1);
    // console.log('getRequest: this.url: {} ',url);
    let res = this.http.get(this.basepath+url, { headers: headerObj1 });
    return res;
  } 
    
  login(data:any): Observable<any>  {
//    let url: string = "/agricommerce/login?username=abc@abc.com&password=123";
    let url: string = "/api/unauthorize/jwtlogin?username="+data.username+"&password="+data.password;
    return this.http.post(url,data,);
  }  

  logout() {
    let url: string = "logout";
    return this.getRequest(url);
  }
}
