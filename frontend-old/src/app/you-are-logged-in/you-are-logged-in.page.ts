import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { MotorbikeService } from '../services/motorbike.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-you-are-logged-in',
  templateUrl: './you-are-logged-in.page.html',
  styleUrls: ['./you-are-logged-in.page.scss'],
})
export class YouAreLoggedInPage implements OnInit {

  constructor(private authService: AuthService, private router: Router, private motorbikeService: MotorbikeService,
    private storage: Storage) { }

  ngOnInit() {
    this.getMotorbikes();
  }

  ionViewDidEnter(){
    this.getMotorbikes();
  }

  async getMotorbikes() {
    let token = await this.storage.get("token");
    this.motorbikeService.getMotorbikes(token).subscribe(res => {
      console.log("User Logged in. This is the motorbike list:");
      console.log(res);
    }, error => {
      console.log(error);
      console.log("User not authenticated. Please log in");
      this.router.navigateByUrl("/home");
    });
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigateByUrl("/home");
    });
  }

}
