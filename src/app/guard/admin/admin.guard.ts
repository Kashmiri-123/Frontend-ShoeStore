import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService){

  }

  canActivate () : boolean {
      
      if(this.authService.getRole() == "ADMIN"){
        return true;
      }
      else{
        window.location.href = "/signin"
        this.router.navigate(["/signin"])
      }
      return false;
  }
}
