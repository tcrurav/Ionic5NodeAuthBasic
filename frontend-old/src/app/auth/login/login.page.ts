import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { YouAreLoggedInPageRoutingModule } from 'src/app/you-are-logged-in/you-are-logged-in-routing.module';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private router: Router, 
    private authService: AuthService, 
    private alertController: AlertController) { }

  ngOnInit() {
  }

  login(form){
    let user: User = {
      id: null,
      username: form.value.email,
      password: form.value.password,
      name: null,
      isAdmin: null
    };
    this.authService.login(user).subscribe((res)=>{
      if(!res.access_token) {
        this.presentAlert("invalid credentials");
        return;
      }
      this.router.navigateByUrl('/you-are-logged-in');
      form.reset();
    }, err => {
      this.presentAlert("Error");
    });
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: message,
      message: 'Could not login. Try again.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
