import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import { OrderService } from 'src/app/service/order/order.service';
import { ProductService } from 'src/app/service/product/product.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
      this.loadAllOrdersByUserId();
  }


  allOrders:any = []
  loadAllOrdersByUserId(){
    this.orderService.getAllOrderByUserId().subscribe(orders => {
      console.log("Orders... "+ JSON.stringify(orders))
      orders.map((order: { [x: string]: any; }) => {
          let orderDetails = {
            productImage : order["Product.image"],
            proructName : order["Product.name"],
            productDescription : order["Product.description"],
            productQuantity : order["quantity"],
            productPrice : order["Product.price"],
            totalPrice : order["totalPrice"],
            status : order["status"],
            productDeliveryDate : order["deliveryDate"]
          }

          this.allOrders.push(orderDetails);
      })
    }, error => console.log("ERROR", error));

  }


  getProductById = () => {
    
  }



}
