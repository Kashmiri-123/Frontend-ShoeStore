import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/service/category/category.service';
import { ProductService } from 'src/app/service/product/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  product: any = "";
  id: any = "";
  caregoryList: any = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private categoryService:CategoryService,
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.handleGetProductById();
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


  handleGetProductById = () => {
    this.productService.getProductById(this.id).subscribe(product => {
      this.product = product.product;
    },
    error => {
      console.log(error);
    })
  }

  handleProductUpdate(){
    this.productService.updateProduct(this.id, this.product).subscribe((productData) => {
      console.log(productData);
      this.router.navigate(["admin-products"]);
    },
    error => {
      console.log(error);
    })
  }

  navigateToProduct(){
    this.router.navigate(["admin-products"]);
  }
}
