import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/service/category/category.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  caregoryList: any = [];
  id: any = "";

  constructor(
    private router:Router,
    private activatedRoute: ActivatedRoute,
    private categoryService:CategoryService,
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

  category: any = "";
  name:any = "";
  description:any = "";

  addCategory = () => {
    this.category = {
      name: this.name,
      description: this.description
    }
    this.categoryService.addCategory(this.category).subscribe((cate) => {
      alert("category added");
      location.reload();
      // this.router.navigate(["admin-categories"]);
    },
    error => {
      console.log(error);
    })
  }

  handleUpdateForm = (category: any) => {
    this.category = category;
    this.id = category.id;
    this.name = category.name;
    this.description = category.description;
  }

  updateCategory = () => {
    this.category = {
      name: this.name,
      description: this.description
    }
    this.categoryService.updateCategory(this.id, this.category).subscribe((category) => {
      console.log(category);
      location.reload();
    },
    error => {
      console.log(error);
    })
  }

  removeCategory = (Id: any) => {
    console.log(Id)
    this.categoryService.removeCategory(Id).subscribe((result) => {
        confirm("Want to remove this category?");
        location.reload();
    },
    error => {
      console.log(error);
    })
  }

}
