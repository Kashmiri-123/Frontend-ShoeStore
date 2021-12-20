import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth/auth.service';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
     private router: Router,
     private authService: AuthService,
     private toastr: ToastrService,
     private formBuilder: FormBuilder
     ) { }

  // name: string = "";
  // email: string = "";
  // password: string = "";
  // phoneNumber: any = "";

  registerForm: any;
  submitted = false;

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(5)]],
      phoneNumber: ['', [Validators.required]]
    })
  }

  get formInputData () {
    return this.registerForm.controls;
  }


  handleregister = () => {
    console.log(this.formInputData.name.value)
    this.submitted = true;
    if(this.formInputData.invalid){
      return;
    }
    else{
      this.authService
      .registerService({
        name: this.formInputData.name.value,
        email: this.formInputData.email.value, 
        password: this.formInputData.password.value, 
        phoneNumber: this.formInputData.phoneNumber.value
      })
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

}
