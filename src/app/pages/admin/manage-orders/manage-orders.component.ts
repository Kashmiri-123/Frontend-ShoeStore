import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/service/order/order.service';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/service/product/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent implements OnInit {

  orderList:any = [];
  productList:any = [];

  constructor(
    private router: Router,
    private orderService: OrderService,
    private productService: ProductService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadAllOrders();
    this.handleAllProducts();
  }

  loadAllOrders(){
    this.orderService.getAllOrders().subscribe((orders) => {
      let allOrders = orders.order;
      console.log(allOrders);
      allOrders.map((order: { [x: string]: any; }) => {
        let orderDetails = {
          id : order["id"],
          customer: order["User.name"],
          productImage : order["Product.image"],
          proructName : order["Product.name"],
          productQuantity : order["quantity"],
          productPrice : order["Product.price"],
          totalPrice : order["totalPrice"],
          status : order["status"],
          productDeliveryDate : order["deliveryDate"]
        }

        this.orderList.push(orderDetails);
    })
    },
    error => {
      console.log(error);
    })
  }

  handleAllProducts(){
    this.productService.getAllProducts().subscribe((products) => {
      this.productList = products;
      // console.log("All products "+ JSON.stringify(this.productList));
    },
    error => {
      console.log(error);
    })
  }


  orderStatus:string = ""
  orderId:string = ""
  loadUpdateForm = (orderId:string) => {
    this.orderId = orderId;
  }


  handleUpdateStatus = () => {
      this.orderService.updateProduct(this.orderId, {status : this.orderStatus}).subscribe(response => {
          if(response){
            this.toastr.success("Order status updated successfully !!")
          }
      }, error => {
        this.toastr.error("Something went wrong");
        return;
      })
      window.location.reload();
  }

}
