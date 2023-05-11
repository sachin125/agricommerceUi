import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../_httpservice/http-service.service';
import { NotificationService } from '../../../_snackbar/notification.service';
import {AppComponent} from '../../../app.component';
import { AuthService } from 'src/app/_auth/auth.service';
import { SharedObjectService } from 'src/app/_auth/sharedobject.service';
import { MenuinComponent } from 'src/app/_menu/menuin.component';
import { DataresolverService } from 'src/app/_httpservice/dataresolver.service';
import { RolebasedComponent } from '../../rolebased.component';

export interface PeriodicElement {
  // sno: number;
  itemname: string;
  price: number;
  quantity: number;
  item: string;
  description: string;
  farmername: string;
  availabled: string;
  user: string;
  modifiedTime: number;
  action: string;
}



@Component({
  selector: 'farmer-productslist',
  templateUrl: './productslist.component.html',
  styleUrls: ['./productslist.component.css']
})
export class ProductslistComponent implements OnInit{

  displayedColumns: string[] = ['itemname', 'price', 'quantity', 'description', 'published', 'availabled', 'user', 'modifiedTime', 'action'];
  //  dataSource = ELEMENT_DATA;
  //  dataSource = ELEMENT_DATA;
  contextRole: string[] = [];
  contextUserId:string;
  constructor(private httpService: HttpService, public notificationService: NotificationService,private rolebasedComponent: RolebasedComponent  ) {
    const response1 = localStorage.getItem('jwtResponse1');
    const response2 = JSON.parse(response1!);
    this.contextUserId = response2['userId'];
    response2['authority'];
    this.contextRole = response2['authority'];
  }

  // async getContextUser() {
  //   await this.rolebasedComponent.getLoadedContextUser();
  //   this.contextUser = DataresolverService.contextUser;
    
  // }


  ngOnInit() {
   // this.getContextUser();
    this.getList();
  }

  productList: any = [];
  

  getList() {
    let url: string = "product/findAll";
    if(this.contextRole.indexOf('ROLE_farmer')>-1){
      url = "product/findByUserId/"+this.contextUserId;
    }else if(this.contextRole.indexOf('ROLE_customer')>-1){
      url = "product/findAll";
    }
    
    this.httpService.getRequest(url).subscribe(
      (response) => {
        console.log('findAll response:{} ',response);
        this.productList = response;
        console.log(this.productList);
      },
      (error) => {
        if(error.status==503){
          this.notificationService.openSnackBar('Service unavailbale', 'close', 'red-snackbar');
        }
        console.log(error);
      });
  }


  actionButton(row: any) {
    this.btnstate = true;
    let selectedRow = JSON.parse(JSON.stringify(row));
    console.log("selected row: " + selectedRow);
    let url: string = "orders/createOrder/"+this.contextUserId+"/"+selectedRow.id;
    this.httpService.getRequest(url).subscribe(
      (response) => {
        console.log(response);

        if (response != null) {
          this.notificationService.openSnackBar('Order created successfully.', 'close', 'blue-snackbar');
          this.getList();
        } else {
          this.notificationService.openSnackBar('Failed to buy product', 'close', 'red-snackbar');
        }

      },
      (error) => {
        console.log(error);
        this.notificationService.openSnackBar('Failed to buy product', 'close', 'red-snackbar');
      });


      
  }


  publishedButton(row: any) {
    let selectedRow = JSON.parse(JSON.stringify(row));
    console.log("selected row: " + selectedRow);
    let url: string = "product/publishProduct/"+ selectedRow.id+"/true";
    this.httpService.getRequest(url).subscribe(
      (response) => {
        console.log(response);

        if (response != null) {
          this.notificationService.openSnackBar('Product published successfully.', 'close', 'blue-snackbar');
          this.getList();
        } else {
          this.notificationService.openSnackBar('Failed to publish product', 'close', 'red-snackbar');
        }

      },
      (error) => {
        console.log(error);
        this.notificationService.openSnackBar('Failed to publish product', 'close', 'red-snackbar');
      });
  }


 btnstate: boolean=false;

  disableFunc(){
    this.btnstate = true;
  }


}
