import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataProviderService } from '../data-provider.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  userData;
  userRegisterForm!: FormGroup;
  successMessage = false;
  userExist = false;
  constructor(
    private api: DataProviderService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initiateRegisterForm();
  }
  /**
   * This method will initiate the register form for the new users
   */
  initiateRegisterForm() {
    this.userRegisterForm = this.formBuilder.group({
      userEmailId: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
      userName: ['', Validators.required],
    });
  }
  get form() {
    return this.userRegisterForm.controls;
  }
  /**
   * This method adds the new User
   */
  addNewuser() {
    this.userExist = false;
    this.api.newUSer(this.userRegisterForm.value).subscribe(
      (data) => {
        this.successMessage = true;
        this.userRegisterForm.reset();
      },
      (error) => {
        if (error.error == 'User Already exist, Please Login') {
          this.userExist = true;
        }
      }
    );
  }
}
