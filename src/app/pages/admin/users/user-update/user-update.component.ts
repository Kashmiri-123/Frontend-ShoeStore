import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user/user.service';
import {ActivatedRoute ,Router } from '@angular/router';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  user:any = "";
  id: any = "";

  constructor(
    private router:Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.handleGetUserById();

  }

  handleGetUserById = () => {
      this.userService.getUsersById(this.id).subscribe((userData) => {
        this.user = userData;
        console.log("USER ", this.user)
      },
      error => {
        console.log(error);
      })
  }

  handleUserUpdate(){
    this.userService.updateUser(this.id, this.user).subscribe((userData) => {
      console.log(userData);
      this.router.navigate(["admin-users"]);
    },
    error => {
      console.log(error);
    })
  }
}
