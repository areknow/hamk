import { Injectable } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, switchMap } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { cfaSignIn, cfaSignOut } from 'capacitor-firebase-auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  uid = this.auth.authState.pipe(
    map(authState => {
      if (!authState) {
        return null;
      } else {
        return authState.uid;
      }
    })
  );

  isAdmin: Observable<boolean> = this.uid.pipe(
    // tap(uid => console.log('this.uid is of type:', typeof this.uid)),
    switchMap(uid => {
      if (!uid) {
        return observableOf(false);
      } else {
        return this.db.object<boolean>('/admin/' + uid).valueChanges();
      }
    })
  );

  isLoggedIn: Observable<boolean> = this.uid.pipe(
    switchMap(uid => {
      if (uid) {
        return observableOf(true);
      } else {
        return observableOf(false);
      }
    })
  );

  constructor(private auth: AngularFireAuth, private db: AngularFireDatabase, private router: Router) {}

  login(): void {
    cfaSignIn('google.com').subscribe((user: firebase.User) => {
      console.log(user.displayName);
    });
  }

  async logout(): Promise<void> {
    cfaSignOut().subscribe();
    this.router.navigate(['/auth']);
  }
}
