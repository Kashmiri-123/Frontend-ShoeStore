import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { OrderService } from 'src/app/service/order/order.service';
import { ProductService } from 'src/app/service/product/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  productList:any = [];

  numOfUser:number = 0;
  numOfProduct:number = 0;
  numOfOrder:number = 0;

  constructor(
    private router: Router,
    private productService: ProductService,
    private userService: AuthService,
    private orderService: OrderService
  ) {
    this.userService.getAllUsers().subscribe((users) => {
      this.numOfUser = users.length;
    });

    this.productService.getAllProducts().subscribe((products) => {
      this.numOfProduct = products.length;
    })

    this.orderService.getAllOrders().subscribe((orders) => {
      this.numOfOrder = orders.order.length;
    })
  }

  ngOnInit(): void {
    this.handleAllProducts();
  }



  handleAllProducts(){
    this.productService.getAllProducts().subscribe((products) => {
      this.productList = products.slice(0,10);
      // console.log("All products "+ JSON.stringify(this.productList));
    },
    error => {
      console.log(error);
    })
  }

}
