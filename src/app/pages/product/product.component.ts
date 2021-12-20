import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(
    private activateRouter: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) { }


  id:any = "";
  ngOnInit(): void {
    this.id = this.activateRouter.snapshot.paramMap.get("id");//path parameter
    // this.id = this.activateRouter.snapshot.queryParamMap.get("id");//for query parameter
    this.loadProduct();
    setTimeout(() => {
      this.loadRelatedProducts(this.product?.category);
    }, 2000);
  }


  product:any;
  loadProduct = () => {
      this.productService.getProductById(this.id).subscribe(product =>{
        if(product){
          this.product = product?.product;
        }
        else{
          console.log("Product not found !!")
        }
      }, error => console.log(error))
  }


  relatedProducts:any = []
  loadRelatedProducts = (categoryId:string) => {
     this.productService.getAllProducts().subscribe((products => {
       products.forEach((product: { category: string; id: string}) => {
          if(product.category === categoryId){
            this.relatedProducts.push(product);
          }
       })
     }));
     console.log("RELATED PRODUCTS", this.relatedProducts);
  }


  handleNavigation(id:string){
    let url = "/product/" + id
    window.location.href = url;
  }

}
