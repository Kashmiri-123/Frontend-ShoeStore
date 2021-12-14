import { AuthService } from 'src/app/service/auth/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService){

  }

  canActivate () : boolean {
      if(this.authService.isAuthenticated().user?.role === "SELLER"){
        return true;
      }
      else{
        this.router.navigate(['/signin'])
        return false;
      }
  }
  
}
