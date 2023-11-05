import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User = {};
  constructor(private router: Router, private afAuth: AngularFireAuth) {}

  registerUser(authData: AuthData) {
    if (authData.email && authData.password) {
      this.afAuth
        .createUserWithEmailAndPassword(authData.email, authData.password)
        .then((result: any) => {
          console.log(result);
          this.authSuccessfully();
        })
        .catch((error: any) => {
          console.log(error);
        });
    } else {
      console.error('Invalid email or password');
    }
  }

  login(authData: AuthData) {
    if (authData.email && authData.password) {
      this.afAuth
        .signInWithEmailAndPassword(authData.email, authData.password)
        .then((result: any) => {
          console.log(result);
          this.authSuccessfully();
        })
        .catch((error: any) => {
          console.log(error);
        });
    } else {
      console.error('Invalid email or password');
    }
  }

  logout() {
    this.user = {};
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.user != null;
  }
  
  private authSuccessfully() {
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }
}
