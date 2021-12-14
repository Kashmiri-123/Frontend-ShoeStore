import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AddressService } from 'src/app/service/address/address.service';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  constructor(
    private addressService: AddressService,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
      this.loadAllAddress();
  }


  allAddress:any = []
  loadAllAddress = () => {
    this.addressService.getAllAddressByUser().subscribe(address => {
       if(address){
        this.allAddress = address;
       }
       else{

       }
    }, error => console.log(error))
  }


  street:string = ""
  houseNumber:string = ""
  State:string = ""
  pinCode:string = ""
  City: string = ""
  Country:string = ""
  id: string = ""
  handleAddAddress = () => {
    let address = {
      street: this.street,
      houseNumber: this.houseNumber,
      State: this.State,
      pinCode: this.pinCode,
      City: this.City,
      Country: this.Country,
      buyer: this.authService.isAuthenticated()?.user?.id
    }
    this.addressService.addAddress(address).subscribe(a => {
      if(a){
        this.toastr.success("Address addedd Successfully !!")
        window.location.reload()
      }
    }, error => {console.log(error)})
  }


  isUpdate = false;
  loadData = (index:number) => {
      let address = this.allAddress[index];

      this.street = address?.street;
      this.houseNumber = address?.houseNumber;
      this.State = address?.State;
      this.pinCode = address?.pinCode;
      this.City = address?.City;
      this.Country = address?.Country;
      this.id = address?.id;

      this.isUpdate = true;
  }

  handleUpdateAddress = () => {
    let address = {
      id: this.id,
      street: this.street,
      houseNumber: this.houseNumber,
      State: this.State,
      pincode: this.pinCode,
      City: this.City,
      Country: this.Country,
      buyer: this.authService.isAuthenticated()?.user?.id
    }
    this.addressService.updateAddress(address).subscribe(a => {
      if(a){
        this.toastr.success("Address Updated Successfully !!")
        setTimeout(() => {
          window.location.reload()
        },1000);
      }
    }, error => {console.log(error)})
  }


  submitData = () => {
    if(this.isUpdate){
      this.handleUpdateAddress();
    }
    else{
      this.handleAddAddress();
    }
    this.isUpdate = false;
  }


  deleteAddress = (addressId:string) => {
      this.addressService.deleteAddress(addressId).subscribe(response => {
        if(response){
          this.toastr.success("Deleted Address Successfully !!")
          setTimeout(() => {
            window.location.reload()
          }, 1000);
        }
      }, error => {console.log(error)});
  }

}
