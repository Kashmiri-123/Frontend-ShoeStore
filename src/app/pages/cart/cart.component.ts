import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddressService } from 'src/app/service/address/address.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { CartService } from 'src/app/service/cart/cart.service';
import { OrderService } from 'src/app/service/order/order.service';

// declare var Razorpay: any;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  allAddress:any = []
  orderId:any = "";

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private orderService: OrderService,
    private toastr: ToastrService,
    private router: Router, 
    private addressService: AddressService
  ) { }

  ngOnInit(): void {
    this.loadAllCartProduct();
    this.loadAllAddress();
    setTimeout(() => {
      this.getTotalAmount();
    }, 2000);
  }

  loadAllAddress = () => {
    this.addressService.getAllAddressByUser().subscribe(address => {
       if(address){
        this.allAddress = address;
       }
       else{

       }
    }, error => console.log(error))
  }

  cartProducts:any = []
  loadAllCartProduct = () => {
    this.cartService.getCartProductByUserId().subscribe((products) => {
      this.cartProducts = products;
      console.log("........", products);
    }, error => console.log(error));
  }


  handleQuantityIncrement = (index:number) => {
      let cartProduct = this.cartProducts[index];
      cartProduct.quantity += 1;
      this.cartService.updateCartProduct(cartProduct).subscribe(responseCartProduct => {
        if(responseCartProduct){
          this.toastr.success("Product quantity incremented");
          window.location.reload();
        }
      }, error => {
        this.toastr.error("Something went wrong !!");
        console.log(error);
      });
      
  }

  handleQuantityDecrement = (index:number) => {
    let cartProduct = this.cartProducts[index];
      if(cartProduct.quantity > 1){
        cartProduct.quantity -= 1;
      this.cartService.updateCartProduct(cartProduct).subscribe(responseCartProduct => {
        if(responseCartProduct){
          this.toastr.success("Product quantity Decremeneted");
          window.location.reload();
        }
      }, error => {
        this.toastr.error("Something went wrong !!");
        console.log(error);
      });
    }
    else{
      this.toastr.error("Delete the product !!")
    }
  }

  handleDeleteProductFromCart = (cartProductId:string) => {
    if(confirm("Are you sure ??")){
      this.cartService.removeProductFromCart(cartProductId).subscribe(deletedProduct => {
        if(deletedProduct){
          this.toastr.success("Product Deleted Successfully !!")
          window.location.reload();
        }
      }, error => console.log(error))
    }
  }


  productPrice:number = 0;
  totalPrice:number = 99;
  getTotalAmount = () => {
    this.cartProducts.map((product: { Product: { price: number; }; quantity: number; }) => {
        this.productPrice += (product?.Product?.price * product.quantity)
    })
    this.totalPrice += this.productPrice;
  }


  deliveryAddress = ""
  handlePlaceOrder = () => {
    this.cartProducts.map( (cartProduct:any) => {
        const order = {
          totalPrice : parseFloat(cartProduct?.Product?.price) * parseFloat(cartProduct.quantity) + 99,
          address : this.deliveryAddress,
          deliveryDate : new Date(new Date().getTime()+(7*24*60*60*1000)),
          quantity : cartProduct.quantity,
          product: cartProduct?.product,
          buyer : this.authService.isAuthenticated()?.user?.id,
          email: this.authService.isAuthenticated()?.user?.email
        }
        console.table(order);
        this.orderService.placeOrder(order).subscribe(responseOrder => {
            if(responseOrder){
                console.log("RESPONSE ORDER : ", responseOrder);
                // window.location.reload();
                // this.orderId = responseOrder;
                this.cartService.removeProductFromCart(cartProduct?.id).subscribe(deletedProduct => {
                  if(deletedProduct){
                      console.log("Product deleted from cart", cartProduct);
                  }
                }, error => {
                  this.toastr.error("Something went wrong")
                  console.log("DELTEING CART ITEM", error);
                  return;
                })
            }
        }, error => {
          this.toastr.error("Add Shipping Address")
          console.log("PLACING ORDER",error);
          return;
        })
    })
    
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  nagivateToAddress = () => {
    this.router.navigate(['/address']);
  }

}
