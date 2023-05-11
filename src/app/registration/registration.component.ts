import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../_httpservice/http-service.service';
import { NotificationService } from '../_snackbar/notification.service';


interface Users {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

 


  public myForm!: FormGroup;
  constructor(private httpService: HttpService, public notificationService: NotificationService) {
  }

  ngOnInit() {
      this.myForm = new FormGroup({
        firstname: new FormControl('', [Validators.required, Validators.maxLength(20)]),
        lastname: new FormControl('', [Validators.required, Validators.maxLength(20)]),
        contactno: new FormControl('', [Validators.required, Validators.maxLength(5)]),
        address: new FormControl('', [Validators.required, Validators.maxLength(20)]),
        userType: new FormControl('', [Validators.required]),
        username: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.email,]),
        password: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      });
  }
  
 public myError = (controlName: string, errorName: string) => {
    return this.myForm.controls[controlName].hasError(errorName);
  }
  user: Users[] = [
    {value: 'Customer', viewValue: 'Customer'},
    {value: 'Farmer', viewValue: 'Farmer'},
  ];

  newUser: any = {};
  onSubmit(){
    this.newUser.firstname = this.myForm.value.firstname;
    this.newUser.lastname = this.myForm.value.lastname;
    this.newUser.contactno = this.myForm.value.contactno;
    this.newUser.address = this.myForm.value.address;
    this.newUser.userType = this.myForm.value.userType;
    this.newUser.username = this.myForm.value.username;
    this.newUser.password = this.myForm.value.password;
    console.log(this.newUser);
    this.addUser();
  }

  addUser() {
    let url: string = "/unauthorize/userRegistration";
    let data: any = this.newUser;
    console.log("data::: ",data);
    this.httpService.postRequest(url, data).subscribe(
      (response) => {
        console.log(response);
        this.notificationService.openSnackBar('User created successfully.', 'close', 'blue-snackbar');
      },
      (error) => {
        console.log(error);
        this.notificationService.openSnackBar('Failed to User creat', 'close', 'red-snackbar');
      });
  }

 


}
