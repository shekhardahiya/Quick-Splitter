import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataProviderService } from './data-provider.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private api: DataProviderService, private route: Router) {}
  canActivate(): boolean {
    if (this.api.userLoggedIn()) {
      return true;
    } else {
      this.route.navigate(['login']);
      return false;
    }
  }
}
