import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth/auth.service';
import { CartService } from 'src/app/service/cart/cart.service';
import { CategoryService } from 'src/app/service/category/category.service';
import { ProductService } from 'src/app/service/product/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productsList: any = [];
  categoryList: any = [];
  isFiltered: boolean = false;

  constructor(
    private productService: ProductService, 
    private categoryService: CategoryService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
      this.loadAllProducts();
      this.loadAllcategories();
  }


  priceSort: string = ""
  category: string = ""
  handleFilter = () => {
      if(this.category === "ALL" || this.category === ""){

      }
      else{
          this.productsList = this.productsList.filter((p: { category: string; }) => p.category === this.category)
          console.log(this.productsList)
      }

      if (this.priceSort === "DEFAULT" || this.priceSort === ""){

      }
      else{
        if(this.priceSort === "INCREASING"){
          this.productsList.sort(function (a:any, b:any) {
            return a.price - b.price;
          });
        }
        if(this.priceSort === "DECREASING"){
          this.productsList.sort(function (a:any, b:any) {
            return b.price - a.price;
          });
        }
      }
  }

  searchedKeyword = ""
  handleSearchBar = () => {
      let searchedProdducts: { name: string; }[] = []
      this.productsList.forEach((product: { name: string }) => {
          if(product.name.includes(this.searchedKeyword)){
            searchedProdducts.push(product);
          }
      });
      this.productsList = searchedProdducts;
  }


  loadAllcategories = () => {
    this.categoryService.getAllCategories()
      .subscribe((category: any) => {
        this.categoryList = category;
    },
    error => {
      console.log(error);
    })
  }

  loadAllProducts(): void {
    this.productService.getAllProducts().subscribe(products => {
      if(products.length > 0){
        // console.log("PRODUCTS ",products);
        this.productsList = products;
      }
    }, error => console.log(error))
  }



  handleAddToCart = (productId:string) => {
    if(!this.authService.isAuthenticated()?.user?.id){
      this.toastr.error("You are not logged in.");
      return;
    }
    else{
      let cartProduct = {
        product : productId,
        quantity : 1,
        creator : this.authService.isAuthenticated()?.user?.id,
      }
      this.cartService.addToCart(cartProduct).subscribe(cartProduct => {
        if(cartProduct){
            this.toastr.success("Product added successfully !!");
            setTimeout(() => {
              window.location.reload();
            }, 1000);
        }
        else{
          this.toastr.error("Some thing went wrong!");
        }
      }, error => console.log(error))
    }
  }


  handleNavigation(id:string){
    let url = "/product/" + id
    this.router.navigate([url])
  }

}
function product(product: any, arg1: (any: any) => void) {
  throw new Error('Function not implemented.');
}

