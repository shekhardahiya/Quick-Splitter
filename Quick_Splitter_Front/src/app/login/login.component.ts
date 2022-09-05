import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataProviderService } from '../data-provider.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userData;
  wrongPassword = false;
  userNotFound = false;
  constructor(
    private api: DataProviderService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}
  userLoginForm!: FormGroup;

  ngOnInit(): void {
    this.initiateLoginForm();
  }
/**
 * This method will initiate the Login Form 
 */
  initiateLoginForm() {
    this.userLoginForm = this.formBuilder.group({
      userEmailId: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: ['', Validators.required],
    });
  }
  get form() {
    return this.userLoginForm.controls;
  }
  /**
   * This method verifies the user credentials
   */
  checkUser() {
    this.wrongPassword = false;
    this.userNotFound = false;
    this.api.getUser(this.userLoginForm.value).subscribe(
      (data) => {
        if ('user' in data) {
          this.userData = data['user'];
          localStorage.setItem(
            'user',
            JSON.stringify({
              userName: this.userData?.userName,
              userEmailId: this.userData?.userEmailId,
              groupsInvolved: this.userData?.groupsInvolved,
            })
          );
          this.api.sendUserData(this.userData?.userName);
          this.router.navigate(['groups']);
        } else {
        }
      },
      (error) => {
        if (error.error['error'] == 'Invalid password') {
          this.wrongPassword = true;
        } else {
          this.userNotFound = true;
          this.userLoginForm.reset();
        }
      }
    );
  }
}
