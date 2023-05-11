import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataresolverService } from '../../../_httpservice/dataresolver.service'

import { HttpService } from 'src/app/_httpservice/http-service.service';
import { MenuinComponent } from 'src/app/_menu/menuin.component';
import { NotificationService } from 'src/app/_snackbar/notification.service';
import { RolebasedComponent } from '../../rolebased.component';


interface Users {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'farmer-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  public myForm!: FormGroup;
  contextRole: string[] = [];
  contextUserId:string;

  constructor(private httpService: HttpService, private notificationService: NotificationService,private rolebasedComponent: RolebasedComponent) {
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
    
      this.myForm = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
        price: new FormControl('', [Validators.required, Validators.maxLength(20)]),
        quantity: new FormControl('', [Validators.required, Validators.maxLength(10)]),
        description: new FormControl('', [Validators.required, Validators.maxLength(20)]),
        published: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.email,]),
      });
  }
  
  
  public myError = (controlName: string, errorName: string) => {
    return this.myForm.controls[controlName].hasError(errorName);
  }
  clicked = false;
  jsonData: any = {};
  onSubmit(){
    console.log('ProductsComponent: contextUser {}',this.contextUserId);

    this.clicked = true;
    this.jsonData.name = this.myForm.value.name;
    this.jsonData.price = this.myForm.value.price;
    this.jsonData.quantity = this.myForm.value.quantity;
    this.jsonData.description = this.myForm.value.description;
    this.jsonData.published = this.myForm.value.published;
    this.jsonData.userId = this.contextUserId;
    console.log(this.jsonData);
    this.sendData();
  }

  sendData() {
    console.log('data:: ', this.jsonData);
    
    let url: string = "product/create";
    let data: any = this.jsonData;
    this.httpService.postRequest(url, data).subscribe(
      (response: any) => {
        this.clicked = false;
        console.log(response);
        if (response != null) {
          this.notificationService.openSnackBar('Product created successfully.', 'close', 'blue-snackbar');
        } else {
          this.notificationService.openSnackBar('Failed to create product', 'close', 'red-snackbar');
        }     
        this.myForm.reset();
      },
      (error: any) => {
        this.clicked = false;
        console.log(error);
        this.notificationService.openSnackBar('Failed to create product', 'close', 'red-snackbar');
      });
  }





}
