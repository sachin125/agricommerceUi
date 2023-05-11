import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { HttpClientModule } from  '@angular/common/http';

import { MaterialModule } from '../_material/material.module';
import { Router, RouterModule, ROUTES, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { UserlistComponent } from './admin//userlist/userlist.component';
import { ProductslistComponent } from './farmer/productslist/productslist.component';
import { ProductsComponent } from './farmer/products/products.component';
import { OrdersComponent } from './customer/orders/orders.component';

import { RolebasedComponent } from './rolebased.component';
import { RolebasedRoutingModule } from './rolebased-routing.module';
import { MenuinComponent } from '../_menu/menuin.component';
import { HttpService } from '../_httpservice/http-service.service';
import { AuthService } from '../_auth/auth.service';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    RolebasedRoutingModule,

  ],
  declarations: [
    MenuinComponent,
    RolebasedComponent,
    UserlistComponent,
    ProductslistComponent,
    ProductsComponent,  
    OrdersComponent
  ],
  providers: [
  ]
})
export class RolebasedModule{
  
}