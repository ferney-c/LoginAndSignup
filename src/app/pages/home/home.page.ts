import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonMenu, IonButtons, IonMenuButton, IonButton } from '@ionic/angular/standalone';
import { UserService } from 'src/app/services/user/user.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonButton, IonMenuButton, IonButtons, IonMenu, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class HomePage implements OnInit {

  my: any;

  perfil: any;

  constructor() { }

  userService = inject(UserService);

  #authService = inject(AuthService);

  #alertCtrl = inject(AlertController);

  ngOnInit() {
    // this.getMy();
    this.getPerfil();
  }

  async getMy() {
    const response = await this.userService.getMy();
    this.my = response.data;
  }

  getPerfil() {
    this.userService.perfil()
    .then((response) => {
      if (response?.data?.success === 1){
        this.perfil = response.data;
      }else{
        this.showAlert(
          'Su token de acceso ya no es valido, por favor inicie sesión nuevamente.'
        );
      }
    })
    .catch(e => {
      this.showAlert(e?.error?.message);
    });
  }


  logout() {
    this.#authService.logout()
    .then((response) => {
      if (response?.data?.success === 1){
        this.#authService.navigateByUrl('/login');
      }else{
        this.showAlert(
          'Su token de acceso ya no es valido, por favor inicie sesión nuevamente.'
        );
      }
    })
    .catch(e => {
      this.showAlert(e?.error?.message);
    });
  }

  async showAlert(message: string) {
    const alert = await this.#alertCtrl.create({
      header: 'Errror de autenticación',
      message: message,
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.#authService.navigateByUrl('/login');
          },
        },
      ],
      backdropDismiss: false,
    });

    await alert.present();
  }

}
