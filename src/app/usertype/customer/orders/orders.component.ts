import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataresolverService } from 'src/app/_httpservice/dataresolver.service';
import { HttpService } from '../../../_httpservice/http-service.service';
import { NotificationService } from '../../../_snackbar/notification.service';
import { RolebasedComponent } from '../../rolebased.component';


export interface PeriodicElement {
  // sno: number;
  orderno: number;
  item: string;
  price: number;
  quantity: number;
  farmername: string;
  emailid: string;
  contactno: number;
  removeitem: string;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//    {sno: 1, orderno: 2, item:'apple', price: 200, quantity: 20, farmername: 'Aakash', emailid: 'aakash@gmail.com', contactno: 85236975},

// ];


@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit{

  displayedColumns: string[] = [ 'orderno', 'item', 'price', 'quantity', 'farmername', 'emailid', 'contactno', 'removeitem'];
  //  dataSource = ELEMENT_DATA;


  public myForm!: FormGroup;

  contextRole: string[] = [];
  contextUserId:string;
  constructor(private httpService: HttpService, public notificationService: NotificationService,private rolebasedComponent: RolebasedComponent) {
    const response1 = localStorage.getItem('jwtResponse1');
    const response2 = JSON.parse(response1!);
    this.contextUserId = response2['userId'];
    response2['authority'];
    this.contextRole = response2['authority'];
  }

  // async getContextUser() {
  //   await this.rolebasedComponent.getLoadedContextUser();
  //   this.contextUser = DataresolverService.contextUser;
  //   this.contextRole = DataresolverService.contextRole;
  // } 

  ngOnInit() {
   // this.getContextUser();
    this.getList();
  }

  orderList: any = [];
  getList() {
    let url: string = "orders/findAll";
    if(this.contextRole.indexOf('ROLE_farmer')>-1){
      url = "orders/findByUserId/"+this.contextUserId;
    }else if(this.contextRole.indexOf('ROLE_customer')>-1){
      url = "orders/findByUserId/"+this.contextUserId;
    }
    this.httpService.getRequest(url).subscribe(
      (response) => {
        console.log(response);
        if(response!=null){
          this.orderList=response;
        }        
      },
      (error) => {
        if(error.status==503){
          this.notificationService.openSnackBar('Service unavailbale', 'close', 'red-snackbar');
        }
      });

  }


  actionButton(row: any) {
    console.log("selected row: " + JSON.stringify(row));
    let selectedRow = JSON.parse(JSON.stringify(row));
    let url: string = "orders/cancelOrder/" + selectedRow.id;
    this.httpService.getRequest(url).subscribe(
      (response) => {
        console.log(response);

        if (response != null) {
          this.notificationService.openSnackBar('Ordered cancelled successfully.', 'close', 'blue-snackbar');
          this.getList();
        } else {
          this.notificationService.openSnackBar('Failed to Cancel Order', 'close', 'red-snackbar');
        }

      },
      (error) => {
        console.log(error);
        this.notificationService.openSnackBar('Ordered cancelled successfully', 'close', 'red-snackbar');
      });
  }








}
