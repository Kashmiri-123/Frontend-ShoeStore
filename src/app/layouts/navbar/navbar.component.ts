import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import { CartService } from 'src/app/service/cart/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAuthenticated = false;
  isAdmin = false;
  numberOfItemInCart:number = 0;

  constructor(private authService: AuthService, private cartService: CartService) {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.isAdmin = this.authService.getRole() === "ADMIN";
    this.cartService.getCartProductByUserId().subscribe(response => {
      this.numberOfItemInCart = response.length;
    })
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.handleLogOut();
    window.location.href = "/"
  }

  

}
