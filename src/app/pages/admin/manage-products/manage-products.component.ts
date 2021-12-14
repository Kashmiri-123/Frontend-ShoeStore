import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/service/product/product.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {

  productList:any = [];

  constructor(
    private router: Router,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.handleAllProducts();
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

  navigate(id:string){
    this.router.navigate(["admin-products-update/" + id]);
  }

  removeProduct = (id: any) => {
    this.productService.removeProduct(id).subscribe((result) => {
        alert(result);
        location.reload();
    },
    error => {
      console.log(error);
    })
  }

}
