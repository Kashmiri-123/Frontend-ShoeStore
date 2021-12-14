import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  usersList:any = [];

  constructor(
    private authService: AuthService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(){
    this.authService
    .getAllUsers().subscribe((users : any) => {
      this.usersList = users;
    },
    error => {
      console.log(error);
    })
  }

  navigate(id: string){
    this.router.navigate(["admin-users-update/"+id]);
  }
}