import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from  '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './_material/material.module';
import { Router, RouterModule, ROUTES, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import {SnackBarOverviewExample} from './_snackbar/snack-bar-overview-example';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
// import { ProductslistComponent } from './usertype/farmer/productslist/productslist.component';
// import { ProductsComponent } from './usertype/farmer/products/products.component';
// import { OrdersComponent } from './usertype/customer/orders/orders.component';
// import { UserlistComponent } from './usertype/admin/userlist/userlist.component';

import {AppRoutingModule} from './app-routing.module';
import { HeaderComponent } from './_header/header.component';
import { MenuinComponent } from './_menu/menuin.component';
import {RolebasedModule} from './usertype/rolebased.module'
import {OutdexComponent} from './outdex/outdex.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
//    MenuinComponent,
    SnackBarOverviewExample,
    AboutComponent,
    ContactComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    OutdexComponent,
    // ProductslistComponent,
    // ProductsComponent,    
    // OrdersComponent,
    // UserlistComponent,
  ],
  imports: [
    RolebasedModule,
    // AdminModule,
    // FarmerModule,
    // CustomerModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule
  ],
  entryComponents: [SnackBarOverviewExample],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

  // menuItems: any[];

  // constructor() { }

  // ngOnInit() {
  //   this.menuItems = routes.filter(menuItem => menuItem);
  // }


}
//export var routes;
