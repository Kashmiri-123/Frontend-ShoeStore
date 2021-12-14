import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category/category.service';
import { ProductService } from 'src/app/service/product/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  caregoryList: any = [];
  product: any = "";
  name: any = "";
  price: any = "";
  description: any = "";
  category: any = "";
  image: any = "";

  constructor(
    private categoryService:CategoryService,
    private productService:ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.handleAllCategory();
  }

  handleAllCategory(){
    this.categoryService.getAllCategories()
      .subscribe((category: any) => {
        this.caregoryList = category;
    },
    error => {
      console.log(error);
    })
  }

  handleAddProduct(){
    console.log("Add Product Hit !!")
    this.product = {
      name: this.name,
      description: this.description,
      price: this.price,
      category: this.category,
      image: this.image
    }
    this.productService.addProduct(this.product).subscribe((productData) => {
      alert("Product added")
      this.router.navigate(["admin-products"]);
    },
    error => {
      console.log(error);
    })
  }

}
