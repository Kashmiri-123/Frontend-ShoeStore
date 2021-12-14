import { AuthService } from './../service/auth/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router){}

  canActivate() : boolean {
    if(this.authService.isAuthenticated()){
      return true;
    }
    else{
      window.location.href = "/signin"
      return false;
    }
  }

}