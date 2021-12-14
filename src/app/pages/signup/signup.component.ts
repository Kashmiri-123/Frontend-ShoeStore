import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
     private router: Router,
     private authService: AuthService,
     private toastr: ToastrService
     ) { }

  ngOnInit(): void {
  }

  name: string = "";
  email: string = "";
  password: string = "";
  phoneNumber: any = "";


  handleregister = () => {
    this.authService
      .registerService({name: this.name, email: this.email, password: this.password, phoneNumber: this.phoneNumber})
      .subscribe(user => {
        if(user){
          this.authService.setUserOnLocalStorage(user);
          window.location.href = "/"
        }
        else{
          console.log("USER NOT FOUND ")
          this.toastr.error("Cannot register user")
        }
      }, error => {
        this.toastr.error(error.error)
      })
  }

}
