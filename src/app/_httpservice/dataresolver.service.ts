import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { HttpService } from '../_httpservice/http-service.service';
import { AuthService } from '../_auth/auth.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { HttpResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataresolverService {
  static getLoadedContextUser1(): any {
    throw new Error('Method not implemented.');
  }

  constructor(private httpService: HttpService) {

  }

  public static contextUser: any = null;
  public static contextRole: any = null;

  getContextUser1() {
    console.log('Entry DataresolverService DataresolverService.contextUser {} ', DataresolverService.contextUser);
    let url = "user/contextUser";
    let res = this.httpService.getRequest(url);
    console.log('Entry DataresolverService getContextUser1 {} ', res);
    return res;
  }

  getContextUser() {
    console.log('Entry DataresolverService getContextUser ');
    let url = "user/contextUser";
    // if(DataresolverService.contextUser!=null){
    //     return DataresolverService.contextUser;
    // }
    this.httpService.getRequest(url).subscribe(
      (response) => {
        console.log('getContextUser: ', response);
        if (response != null) {
          DataresolverService.contextUser = response;
          DataresolverService.contextRole = DataresolverService.contextUser.roles[0];
          console.log('DataresolverService.contextUser: ', DataresolverService.contextUser);
          console.log('DataresolverService.contextRole: ', DataresolverService.contextRole);
        }
        return response;
      },
      (error) => {
        console.log(error);
      });
  }
}



// .subscribe(
//   (response) => {
//     console.log('getContextUser: ', response);
//     if (response != null) {
//       DataresolverService.contextUser = response;
//       DataresolverService.contextRole = DataresolverService.contextUser.roles[0];
//       console.log('DataresolverService.contextUser: ', DataresolverService.contextUser);
//       console.log('DataresolverService.contextRole: ', DataresolverService.contextRole);
//     }
//     return response;
//   },
//   (error) => {
//     console.log(error);
//   });
