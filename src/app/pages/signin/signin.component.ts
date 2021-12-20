import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ForgotPasswordService } from 'src/app/service/forgotPassword/forgot-password.service';
import { ToastrService } from 'ngx-toastr';
import {FormBuilder, Validators} from '@angular/forms';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(
      private authService: AuthService,
      private formBuilder : FormBuilder,
      private router: Router,
      private forgotPasswordService: ForgotPasswordService,
      private toastr: ToastrService
    ) { }

  loginForm: any;
  sendEmail: string = ""
  submitted = false;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(5)]]
    })
  }

  get formInputData(){
    return this.loginForm.controls;
  }

  onSubmit = () => {
    this.submitted = true;
    if(this.loginForm.invalid){
      return;
    }
    else{
      this.authService
      .logInService({email : this.formInputData.email.value, password : this.formInputData.password.value})
      .subscribe( user => {
        if(user?.user?.email){
          this.authService.setUserOnLocalStorage(user);
          window.location.href = "/"
        }
        else{
          this.toastr.warning("User not found with this email.");
        }
      },
      error => {
        console.error(error);
        this.toastr.warning(error.error)
      }
      )
    }
  }

  sendMail = () => {
    if(this.sendEmail === ""){
      this.toastr.warning("Please enter your email");
    }
    else{
      this.forgotPasswordService
        .forgotPasswordEmail({email : this.sendEmail})
        .subscribe( result => {
          this.toastr.success(result?.message);
          this.sendEmail = "";
        },
        error => {
          this.toastr.warning("Email not registered!")
          console.error(error);
        }
        )
    }
  }
}
