import { Injectable } from '@angular/core';
import { IUserLoginInput } from '../interfaces/login-input';
import { IUserSignUpInput } from '../interfaces/signup-input';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  loginUser(input: IUserLoginInput) {
    console.log('logged in');
  }

  signUp(input: IUserSignUpInput) {
    console.log('signed up');
  }
}
