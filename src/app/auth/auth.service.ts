import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { TrainingService } from '../training/training.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UIService } from '../shared/ui.service';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User = {};
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UIService
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
      }
    });
  }

  registerUser(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    if (authData.email && authData.password) {
      this.afAuth
        .createUserWithEmailAndPassword(authData.email, authData.password)
        .then((result) => {
          this.uiService.loadingStateChanged.next(false);
        })
        .catch((error: any) => {
          this.uiService.loadingStateChanged.next(false);
          this.uiService.showSnackbar(error.message, null, 3000);
        });
    } else {
      console.error('Invalid email or password');
    }
  }

  login(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    if (authData.email && authData.password) {
      this.afAuth
        .signInWithEmailAndPassword(authData.email, authData.password)
        .then((result) => {
          this.uiService.loadingStateChanged.next(false);
        })
        .catch((error: any) => {
          this.uiService.loadingStateChanged.next(false);
          this.uiService.showSnackbar(error.message, null, 3000);
        });
    } else {
      console.error('Invalid email or password');
    }
  }

  logout() {
    this.afAuth.signOut();
    // this.trainingService.cancelSubscriptions();
    // this.authChange.next(false);
    // this.router.navigate(['/login']);
    // this.isAuthenticated = false;
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
