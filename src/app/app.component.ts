import { Component, OnInit } from '@angular/core';
import { HttpService } from './_httpservice/http-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Agricommerce'
  
  constructor() { }

  ngOnInit() {
    //this.getContextUser();
   // this.menuDisplay('');
  }
  public static contextUser: any;
  public static contextRole: any;

  // getContextUser() {
  //   let url = "User/contextUser"
  //   this.httpService.getRequest(url).subscribe(
  //     (response) => {
  //       console.log('getContextUser: ', response);
  //       if (response != null) {
  //         AppComponent.contextUser = response;
  //         AppComponent.contextRole = AppComponent.contextUser.roles[0];
  //         console.log('AppComponent.contextUser: ', AppComponent.contextUser);
  //         console.log('AppComponent.contextRole: ', AppComponent.contextRole);
          
  //       }
  //     },
  //     (error) => {
  //       console.log(error);
  //     });
  // }

}
