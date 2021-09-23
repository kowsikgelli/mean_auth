import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public authService:AuthService,
    private router:Router,
    private flashmessages:FlashMessagesService
  ) { }

  ngOnInit(): void {
  }

  onLogout(){
    this.authService.logout();
    this.flashmessages.show("You logged Out",{cssClass:'alert-success',timeout:5000})
    this.router.navigate(['login'])
    return false
  }
}