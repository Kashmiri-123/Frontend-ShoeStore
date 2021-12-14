import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ForgotPasswordService } from 'src/app/service/forgotPassword/forgot-password.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(
      private authService: AuthService,
      private router: Router,
      private forgotPasswordService: ForgotPasswordService,
      private toastr: ToastrService
    ) { }

  ngOnInit(): void {
  }


  email: string = ""
  password: string = ""
  sendEmail: string = ""


  handleSignIn = () => {
      if(this.email===""){
        this.toastr.error("Email is required")
      }
      else if(this.password===""){
        this.toastr.error("Password is required")
      }
      else{
        this.authService
        .logInService({email : this.email, password : this.password})
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
