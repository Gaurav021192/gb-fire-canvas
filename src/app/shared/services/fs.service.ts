import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './auth.service';
import { isNullOrUndefined } from 'util';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class FsService {

  ref = firebase.firestore().collection('boards'); // firestore collection variable
  boards: any;
  boardsDetails: any;
  updateboards: any;
  deleteboards: any;
  postboards: any;
  user: any;
  isadmin: boolean;

  constructor(
    public afAuth: AngularFireAuth,
    public authService: AuthService,
    public afs: AngularFirestore) { 
      this.user = this.afAuth.auth.currentUser; // Current Logged in user

      // User details from user collection as per logged in user-id
      this.afs.doc<User>(`users/${this.user.uid}`).valueChanges().subscribe(user => {
        this.isadmin = (isNullOrUndefined(user.roles.admin) ? false : user.roles.admin);      
        // console.log(user.email + ' ' + user.uid + ' ' + user.roles);
      }); 
    }

  //Return details of Books from boards collection from firestore
  public getBoards(): Observable<any> {    
    if(this.user) {
      this.boards = new Observable((observer) => {
        this.ref.onSnapshot((querySnapshot) => {
          let boards = [];
          querySnapshot.forEach((doc) => {
            let data = doc.data();
            boards.push({
              key: doc.id,
              title: data.title,
              description: data.description,
              author: data.author
            });
          });
          observer.next(boards);
        });
      });        
    // console.log("user " + JSON.parse(JSON.stringify(this.afAuth.auth.currentUser)).stsTokenManager.accessToken);
    // console.log("user details " + this.user);
    // console.log("uid is " + this.user.uid);
    }
    else {
      console.log("Unauthorised access!!!!")
    } 
    return this.boards;
  }

  // Return Book details correspondent to book-id from firestore boards collection
  public getBoard(id: string): Observable<any> {
    if(this.user) {
      this.boardsDetails =  new Observable((observer) => {
        this.ref.doc(id).get().then((doc) => {
          let data = doc.data();
          observer.next({
            key: doc.id,
            title: data.title,
            description: data.description,
            author: data.author
          });
        });
      });
    }
    return this.boardsDetails;
  }

  // Create new book entry in firestore boards collection
  public postBoards(data: any): Observable<any> {
    if(this.isadmin) {
      this.postboards = new Observable((observer) => {
        this.ref.add(data).then((doc) => {
          observer.next({
            key: doc.id,
          });
        });
      });
    }
    else {
      console.log("Unauthorised access!!!!")
    }
    return this.postboards;
  }

  // Update existing book details
  public updateBoards(id: string, data: any): Observable<any> {     
    if(this.isadmin) {
      this.updateboards = new Observable((observer) => {
        this.ref.doc(id).set(data).then(() => {
          observer.next();
        });
      });
    }
    else {
      console.log("Unauthorised access!!!!");
    }
    return this.updateboards;
  }

  // Delete book entry from firestore boards collection by book-id
  deleteBoards(id: string): Observable<{}> {
    if(this.isadmin) {
      this.deleteboards = new Observable((observer) => {
        this.ref.doc(id).delete().then(() => {
          observer.next();
        });
      });
    }
    else {
      console.log("Unauthorized Access!!!!");
    }
    return this.deleteboards;
  }
}
