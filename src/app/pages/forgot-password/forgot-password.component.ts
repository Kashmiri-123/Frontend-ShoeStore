import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ForgotPasswordService } from 'src/app/service/forgotPassword/forgot-password.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  id: any = "";
  password: string = "";
  confirmPassword: string = "";

  constructor(
    private activateRouter: ActivatedRoute,
    private router: Router, 
    private forgotPasswordService: ForgotPasswordService,
    private toastr: ToastrService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.id = this.activateRouter.snapshot.paramMap.get("id");
  }

  updatePassword(){
    if(this.password!="" && this.confirmPassword!=""){
      if(this.confirmPassword === this.password){
        this.forgotPasswordService
          .updatePassword({password: this.password}, this.id)
          .subscribe( result => {
            this.toastr.success(result.message)
            this.authService.handleLogOut();
            setTimeout(() => {
              window.location.href = "/signin";
            }, 2000);
          },
          error => {
            this.toastr.warning("Password cannot be updated")
          })
      }
      else{
        this.toastr.warning("New Password and Confirm Password donot match")
      }
    }
    else{
      this.toastr.warning("Fill the password")
    }
  }

}
