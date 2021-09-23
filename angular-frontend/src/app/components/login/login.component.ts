import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FlashMessagesService } from 'flash-messages-angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string = ''
  password:string = ''
  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessages: FlashMessagesService
  ) { }

  ngOnInit(): void {
    console.log(this.authService.isTokenExpired())
  }

  onSubmit(){
    const user = {
      email: this.email,
      password: this.password
    }
    this.authService.authenticateUser(user).subscribe(data=>{
      console.log(data)
      if(data.success){
        this.authService.storeUser(data.message,data.user)
        this.flashMessages.show('Logged In Successful',{cssClass:"alert-success",timeout:5000})
        this.router.navigate([''])
      }else{
        this.flashMessages.show(data.message,{cssClass:"alert-danger",timeout:5000})
        this.router.navigate(['login'])
      }
    })
  }
}
