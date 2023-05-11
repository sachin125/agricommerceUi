import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserlistComponent } from './usertype/admin/userlist/userlist.component';
import { ProductsComponent } from './usertype/farmer/products/products.component';
import { ProductslistComponent } from './usertype/farmer/productslist/productslist.component';
import { OrdersComponent } from './usertype/customer/orders/orders.component';
import {RolebasedModule} from './usertype/rolebased.module';
import {OutdexComponent} from './outdex/outdex.component';

export let routes: Routes = [
    { path: 'home', component: HomeComponent  },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent  },
  { path: 'registration', component: RegistrationComponent  },
    { path: 'login', component: LoginComponent  },
    { path: 'outdex', component: OutdexComponent  },
//    { path: 'userlist', component: UserlistComponent},
    // { path: 'product', component: ProductsComponent},
    // { path: 'productslist', component: ProductslistComponent },
//    { path: 'orders', component: OrdersComponent },
    { path: '', redirectTo: '/outdex', pathMatch: 'full' },
    { path: '**', component: OutdexComponent},
    { path: 'role',loadChildren: () => import('./usertype/rolebased.module').then(m => m.RolebasedModule)  },
  ]

@NgModule({
  imports: [
    RouterModule.forRoot(   
        routes,
//      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
