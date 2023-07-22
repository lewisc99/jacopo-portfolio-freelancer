import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Login } from 'src/app/domain/entities/login';
import { LoginService } from 'src/app/services/login.service';
import { LewisModulesValidators } from 'src/app/shared/validators/lewis-modules-validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  login: Login;
  errorActived: boolean = false;
  errorMessage: string = '';
  loginSubscription: Subscription = new Subscription();
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Login');
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(40),
          Validators.email,
          LewisModulesValidators.notOnlyWhiteSpace,
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
          LewisModulesValidators.notOnlyWhiteSpace,
        ],
      ],
    });
    this.loginSubscription = new Subscription();
  }

  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
  }

  get email() {
    return this.formGroup.get('login.email');
  }
  get password() {
    return this.formGroup.get('login.password');
  }

  public onSubmit() {
    this.errorActived = false;
    this.errorMessage = '';
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
    } else {
      const email = this.formGroup.value.email;
      const password = this.formGroup.value.password;
      this.login = new Login(email, password);
    this.loginSubscription =  this.loginService.login(this.login).subscribe({
        next: () => {
          this.router.navigate(['/..', 'blog']);
        },
        error: (error: string) => {
          alert(error);
        },
      });
    }
  }
}
