import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../../_httpservice/http-service.service';
import { NotificationService } from '../../../_snackbar/notification.service';

export interface PeriodicElement {
  // SNo: number;
  FirstName: string;
  LastName: string;
  EmailID: string;
  ContactNo: number;
  Availability: string;
  Enable: string;
}



@Component({
  selector: 'userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent {

  displayedColumns: string[] = [ 'firstname', 'lastname', 'username', 'contactno', 'enabled', 'action'];


  public myForm!: FormGroup;
  constructor(private httpService: HttpService, public notificationService: NotificationService) {
  }
//rolename = Farmer, Customer
  userList: any = [];

  // getList() {
  //   let url: string = "/User/findAll";
  //   this.httpService.getRequest(url).subscribe(
  //     (response) => {
  //       console.log(response);
  //       this.userList = response;
  //       console.log(this.userList);
  //     },
  //     (error) => {
  //       console.log(error);
  //     });
  // }

  getListByRoleName(rolename:string) {
    let url: string = "user/findByRoleName?rolename=ROLE_"+rolename;
    this.httpService.getRequest(url).subscribe(
      (response) => {
        console.log(response);
        this.userList = response;
        console.log(this.userList);
      },
      (error) => {
        console.log(error);
      });
  }

  ngOnInit() {
//    this.getList();
    this.farmers();
  }

  actionDisableButton(row: any) {
    this.actionButton(row,'false');
  }
  actionEnableButton(row: any) {
    this.actionButton(row,'true'); 
  }

  actionButton(row: any, value:String) {
    let selectedRow = JSON.parse(JSON.stringify(row));
    console.log("selected row: " + selectedRow);
    let url: string = "user/changeStatus?username=" + selectedRow.username+"&value="+value;
    this.httpService.getRequest(url).subscribe(
      (response) => {
        console.log(response);
        if (response != null) {
          this.notificationService.openSnackBar('User status changed.', 'close', 'blue-snackbar');
          this.farmers();
        } else {
          this.notificationService.openSnackBar('Failed to change status', 'close', 'red-snackbar');
        }

      },
      (error) => {
        console.log(error);
        this.notificationService.openSnackBar('Failed to change status', 'close', 'red-snackbar');
      });
  }


  customers() {
    this.getListByRoleName("customer");
  }

  farmers() {
    this.getListByRoleName("farmer");
  }

}
