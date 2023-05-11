import { Component, OnInit } from '@angular/core';

import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { RegistrationComponent } from '../registration/registration.component';
import { ProductslistComponent } from '../usertype/farmer/productslist/productslist.component';
import { UserlistComponent } from '../usertype/admin/userlist/userlist.component';
import { ProductsComponent } from '../usertype/farmer/products/products.component';
import { OrdersComponent } from '../usertype/customer/orders/orders.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { HttpService } from '../_httpservice/http-service.service';
import { JwtResponse } from '../_model/JwtResponse';
import { AuthService } from '../_auth/auth.service';
import { Router } from '@angular/router';
import { DataresolverService } from '../_httpservice/dataresolver.service';


@Component({
  selector: 'app-menuin',
  templateUrl: './menuin.component.html',
  styles: [
    `.angular-logo {
        margin: 0 4px 3px 0;
        height: 35px;
        vertical-align: middle;
    }
    .fill-remaining-space {
      flex: 1 1 auto;
    }
    `
  ]
})
export class MenuinComponent implements OnInit{

  menuHome =  { path: 'home', component: HomeComponent,text:"Home" };
  menuAbout = { path: 'about', component: AboutComponent, text:"About" };
  menuContact = { path: 'contact', component: ContactComponent, text:"Contact" };
  menuRegistration = { path: 'registration', component: RegistrationComponent, text:"Registration" };
  menuLogin = { path: 'login', component: LoginComponent, text:"Login" };
  
  menuUserlist =  { path: 'userlist', component: UserlistComponent,text:"Users" };
  menuOrders =  { path: 'orders', component: OrdersComponent,text:"Orders" };
  menuProducts =  { path: 'products', component: ProductsComponent,text:"Product Registration" };
  menuProductslist =  { path: 'productslist', component: ProductslistComponent,text:"All Product" };
 //menuLogout =  { path: 'logout', component: ProductslistComponent,text:"Logout" };
  
  menuItems: any[]=[];

  constructor(private httpService:HttpService,private authService: AuthService,private router: Router,private dataresolverService: DataresolverService) { }

  contextRole:any;

  ngOnInit() {
    console.log('before ngOnInit MenuinComponent');
    this.getContextUser();   
    console.log('after ngOnInit MenuinComponent ');
  }

  async getContextUser() {
    let res = await this.dataresolverService.getContextUser1().pipe().toPromise();
    // res.subscribe(
    //     (response) => {
    //       console.log('MenuinComponent: response: ', response);
    //       if (response != null) {
    //         DataresolverService.contextUser = response;
    //         DataresolverService.contextRole = DataresolverService.contextUser.roles[0];
    //         console.log('MenuinComponent.contextUser: ', DataresolverService.contextUser);
    //         console.log('MenuinComponent.contextRole: ', DataresolverService.contextRole);
    //       }
    //       return response;
    //     },
    //     (error) => {
    //       console.log(error);
    //     });
    console.log('MenuinComponent res{} ',res);
      DataresolverService.contextUser = res;
      DataresolverService.contextRole = res.roles[0];
    this.menuDisplay(DataresolverService.contextRole.name);
 }

  menuDisplay(roleName:String){
    console.log('menuDisplay: roleName: {} ',roleName);
    // this.menuItems.push(this.menuHome);  
    // this.menuItems.push(this.menuAbout);  
    // this.menuItems.push(this.menuContact);  
    // this.menuItems.push(this.menuRegistration);  
    // this.menuItems.push(this.menuLogin);

    if(roleName!=null && roleName!=''){
      this.menuItems=[];
      if(roleName.toLowerCase().indexOf('admin')!=-1){
        this.menuItems.push(this.menuUserlist);
      }else if(roleName.toLowerCase().indexOf('farmer')!=-1){
        this.menuItems.push(this.menuProducts);
        this.menuItems.push(this.menuProductslist);
      }else if(roleName.toLowerCase().indexOf('customer')!=-1){
        this.menuItems.push(this.menuProductslist);
        this.menuItems.push(this.menuOrders);
      }
      console.log('this.menuItems: ',this.menuItems);
//      this.menuItems.push(this.menuLogout);
      this.router.navigate(['role/'+this.menuItems[0].path]);
    }
  }

  logout(){
    this.authService.logout();
  }

}