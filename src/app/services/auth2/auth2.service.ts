import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CapacitorHttp } from '@capacitor/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AlertController } from '@ionic/angular/standalone';
import { Preferences } from '@capacitor/preferences';


@Injectable({
  providedIn: 'root'
})
export class Auth2Service {

  constructor() { }

  private router = inject(Router);
  private alertCtrl = inject(AlertController);

  private _token = new BehaviorSubject<any>(null);

  getToken() {
    return this._token.asObservable();
  }
  updateToken(token: string) {
    this._token.next(token);
  }

  setName = async () => {
    await Preferences.set({
      key: 'token',
      value: 'Max',
    });
  };

  async setUserData(token: string) {
    this.updateToken(token);
    await Preferences.set({
      key: 'token',
      value: token,
    });
  }

  async register(formValue: any) {
    const options = {
      url: environment.serverUrl+'signup',
      params: formValue,
      data: formValue,
    };

    try {
      const response = await CapacitorHttp.post(options);

      // guardar token en local storage
      this.setUserData(response?.data?.token);

      return response;
    } catch (e) {
      throw e;
    }
  }

  async login(formValue: any) {
    const options = {
      url: environment.serverUrl+'login',
      params: formValue,
      data: formValue,
    };

    try {
      const response = await CapacitorHttp.post(options);

      // guardar token en local storage
      this.setUserData(response?.data?.token);

      return response;
    } catch (e) {
      throw e;
    }
  }

  showAlert(message: string) {
    this.alertCtrl.create({
      header: 'Error de Autenticacion',
      message,
      buttons: ['OK'],
    })
    .then(alertEl => alertEl.present());
  }

  navigateByUrl(url: string) {
    this.router.navigateByUrl(url, { replaceUrl: true });
  }
}
