import {authGuard} from '../_auth/auth.guard';

import { NgModule, OnInit } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserlistComponent } from "./admin/userlist/userlist.component";
import { OrdersComponent } from './customer/orders/orders.component';
import { ProductsComponent } from "./farmer/products/products.component";
import { ProductslistComponent } from "./farmer/productslist/productslist.component";
import {RolebasedComponent} from './rolebased.component'
import {DataresolverService} from '../_httpservice/dataresolver.service';


const rolebasedRoutes: Routes = [
    {
      path: 'role',
      component: RolebasedComponent,
      // resolve:{
      //   contextUserData:DataresolverService  
      // },   
//      canActivate: [authGuard],
      children: [
        {
          path: '',
          children: [
             { path: 'userlist', component: UserlistComponent },
             { path: 'orders', component: OrdersComponent },
             { path: 'products',  component: ProductsComponent },
             { path: 'productslist', component: ProductslistComponent },
          ]
        }
      ]
    }
  ];
  
  @NgModule({
    imports: [
      RouterModule.forChild(rolebasedRoutes)
    ],
    exports: [
      RouterModule
    ]
  })
  export class RolebasedRoutingModule {


  }