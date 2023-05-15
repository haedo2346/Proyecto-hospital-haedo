import { Injectable } from '@angular/core';
import {
  Auth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "@angular/fire/auth"

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private auth:Auth) { }

  register(email, password){
    return createUserWithEmailAndPassword(this.auth,email,password)
  }

  login(email, password){
    return signInWithEmailAndPassword(this.auth,email,password)
  }


}
