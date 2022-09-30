import { Observable } from 'rxjs';
import { Injectable, NgZone } from '@angular/core';
import { User } from '../services/user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import * as uuidv4 from 'uuid';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;

  /**
   * Class constructor
   * @param afs
   * @param afAuth
   * @param router
   * @param ngZone
   */
  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    if(!this.userData) {
      try {
        this.userData =  JSON.parse(localStorage.getItem('user')!);
      } catch(e) {
      }
    }

    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  authState(): Observable<firebase.User | null> {
    return this.afAuth.authState;
  }

  /**
   *
   * @param email
   * @param password
   * @returns
   */
  signIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.setUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['dashboard']);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  /**
   *
   * @param email
   * @param password
   * @returns
   */
  signUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.sendVerificationMail();
        this.setUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  /**
   *
   * @returns
   */
  sendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email']);
      });
  }

  /**
   *
   * @param passwordResetEmail
   * @returns
   */
  forgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  /**
   *
   */
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  /**
   *
   * @returns
   */
  googleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      this.router.navigate(['dashboard']);
    });
  }

  /**
   *
   * @param provider
   * @returns
   */
  authLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.setUserData(result.user);
        this.router.navigate(['dashboard']);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  /**
   *
   * @param user
   * @returns
   */
  setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    let userData: any = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };

    return userRef.set(userData, {
      merge: true,
    });
  }

  setShareBot(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `share-bot/${user.uid}`
    );
    return userRef.set({tgName: user.tgName, tgKey: user.tgKey, uid: user.uid, active: false}, {
      merge: true,
    });
  }

  getShareBot(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `share-bot/${user.uid}`
    );
    return userRef.get();
  }

  getUser(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    return userRef.get();
  }

  writeMessage(user: any ='', input: any) {
    const uid = uuidv4.v4();
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `texts/${uid}`
    );
    const data: any = {
      text: input.text,
      title: input.title,
      summary: input.summary,
      tid: uid,
      uid: user.uid,
    };
    return userRef.set(data, {
      merge: true,
    }).then(() => {
      return {
        uid
      }
    });
  }


  updateMessage(uid: any, user: any ='', input: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `texts/${uid}`
    );
    const data: any = {
      text: input.text,
      title: input.title,
      summary: input.summary,
      tid: uid,
      uid: user.uid,
    };
    return userRef.set(data, {
      merge: true,
    }).then(() => {
      return {
        uid
      }
    });
  }

  getTexts(user: any) {
    const userRef: AngularFirestoreCollection<any> = this.afs.collection(
      `texts`,
      ref => ref.where('uid', '==', user.uid)
    );
    return userRef.get();
  }

  getText(user: any, tid: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `texts/${tid}`
    );
    return userRef.get();
  }


  getLinks(user: any) {
    const userRef: AngularFirestoreCollection<any> = this.afs.collection(
      `links`,
      ref => ref.where('uid', '==', user.uid)
    );
    return userRef.get();
  }

  /**
   *
   * @returns
   */
  signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/']);
    });
  }
}
