import { Injectable } from '@angular/core';
import { HttpService } from '../_httpservice/http-service.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtResponse } from '../_model/JwtResponse';
import {SharedObjectService} from './sharedobject.service';
import { NotificationService } from '../_snackbar/notification.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = false;    
  // store the URL so we can redirect after logging in
  redirectUrl: string | null = null;
  jwtResponse: JwtResponse = new JwtResponse();

  constructor (
    private httpService: HttpService,
    private router: Router,
    private notificationService: NotificationService,
//    private sharedObjectService: SharedObjectService
  ) {}

  login(UserCredential:any){
    localStorage.setItem('jwtResponse1', '');
    localStorage.setItem('jwttoken','');
    var returnResponse;
    this.redirectUrl = "/role";
    this.httpService.login(UserCredential).subscribe(
      (response) => {
        returnResponse = response;
        console.log("login response: ",response);
        if(response['jwt']!=null){
          this.jwtResponse =  this.jwtResponse.deserialize(response);
          localStorage.setItem('jwtResponse1', JSON.stringify(response));
          localStorage.setItem('jwttoken', response['jwt']);
          SharedObjectService.jwtToken = response['jwt'];
          this.isLoggedIn = true;
          if (this.redirectUrl) {
            this.router.navigate([this.redirectUrl]);
  //          this.redirectUrl = "";
          }
        }else{
          this.notificationService.openSnackBar(response['msg'], 'close', 'red-snackbar');
        }
        
        //window.location.replace(response.url);   
      },
      (error) => {
        if(error!=null && error.status==200){
          window.location.replace(error.url);
        }
        console.log("login error response: ",error);
      });
      return returnResponse;
  }
  //login(username: any, password: any): Observable<boolean>;

  getContextUser(): JwtResponse {
    return this.jwtResponse;
  }

  logout(): void {
    this.isLoggedIn = false;
    this.httpService.logout();
    localStorage.removeItem('jwtResponse');
    localStorage.removeItem('jwttoken');
    this.router.navigate(['']);
  }
}