import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AuthData } from '../auth-data.model';
import { UIService } from 'src/app/shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  isLoading = false;
  private loadingSubs!: Subscription;

  constructor(private authService: AuthService, private uiService: UIService) {}

  ngOnInit(): void {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(
      (isLoading) => {
        this.isLoading = isLoading;
      }
    );
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', {
        validators: [Validators.required],
      }),
    });
  }

  onSubmit() {
    if (this.loginForm) {
      this.authService.login({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      });
    }
  }

  ngOnDestroy(): void {
    if (this.loadingSubs) 
      this.loadingSubs.unsubscribe();
  }
}
