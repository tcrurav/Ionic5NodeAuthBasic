import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../services/user.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-you-are-logged-in',
  templateUrl: './you-are-logged-in.page.html',
  styleUrls: ['./you-are-logged-in.page.scss'],
})
export class YouAreLoggedInPage implements OnInit {

  constructor(private authService: AuthService, private router: Router, private userService: UserService,
    private storage: Storage) { }

  ngOnInit() {
    this.getUsers();
  }

  async getUsers() {
    let token = await this.storage.get("token");
    this.userService.getUsers(token).subscribe(res => {
      console.log("resultado");
      console.log(res);
    })
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigateByUrl("/home");
    });
  }

}
