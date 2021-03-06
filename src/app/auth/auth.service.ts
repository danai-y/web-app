import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userData: any;
  public user!: any;
  public updateUserData$ = new Subject<boolean>();
  private usersRef!: AngularFireList<any>;

  constructor(
    public auth: AngularFireAuth,
    private db: AngularFireDatabase,
  ) {
    this.usersRef = this.db.list('users');
    auth.user.subscribe(item => {
      this.user = item;
      if (this.user) {
        this.db.list('users', ref => ref.orderByChild('uid').equalTo(this.user.uid)).valueChanges().subscribe(user => {
          this.userData = user[0]
          this.updateUserData$.next(true);
          if (!this.userData) { this.logout() }
        });
      } else {
        console.log('No one is logged in')
      }
    })

  }

  login(email: string, password: string) {
    this.auth.signInWithEmailAndPassword(email, password)
  }

  logout() {
    this.auth.signOut();
    this.userData = null;
    this.updateUserData$.next(true);
  }

  signUp(name: string, phone: string, email: string, password: string) {
    this.auth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
      let user = userCredential.user;
      this.usersRef.push({
        'uid': user?.uid,
        'role': 'staff',
        'name': name,
        'phone': phone,
      })
      this.logout();
    })
  }

  delete(key: string, email: string, password: string) {
    this.auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
      let user = userCredential.user;
      user?.delete().then(() => {
        this.usersRef.remove(key);
      })
    })
  }

}
