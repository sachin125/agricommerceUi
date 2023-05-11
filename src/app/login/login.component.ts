
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../_httpservice/http-service.service';
import { NotificationService } from '../_snackbar/notification.service';
import { AuthService } from '../_auth/auth.service';

//https://stackblitz.com/edit/login-register-angular-material?file=src%2Fapp%2Fnavbar%2FlogIn%2FlogIn.component.ts
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public myForm!: FormGroup;
  constructor(private authService: AuthService,private httpService: HttpService, public notificationService: NotificationService) {
  }

  ngOnInit() {
      this.myForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.email,]),
        password: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      });
  }

  public myError = (controlName: string, errorName: string) => {
    return this.myForm.controls[controlName].hasError(errorName);
  }

  
  onSubmit() {
    console.log('password:: ', );
    console.log('email:: ', );

    let userCredential = {
      "username":this.myForm.value.email,
      "password": this.myForm.value.password
    }
    // const formData :FormData = new FormData();
    // formData.append('username', this.myForm.value.email);
    // formData.append('password', this.myForm.value.email);

    var returnResponse = this.authService.login(userCredential);
    
  }

  

}
