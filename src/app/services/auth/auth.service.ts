import { HttpClient } from '@angular/common/http';
import { inject, Injectable, input } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AlertController } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private http = inject(HttpClient);
  private router = inject(Router);
  private alertCtrl = inject(AlertController);

  private _token = new BehaviorSubject<any>(null);

  get token() {
    return this._token.asObservable();
  }
  updateToken(token: string) {
    this._token.next(token);
  }

  setUserData(token: string) {
    localStorage.setItem('token', token);
    this.updateToken(token);
  }

  async register(formValue: any) {
    try {
      const response = await lastValueFrom(this.http.post<any>(environment.serverUrl + 'signup', formValue));
      console.log(response);

      // guardar token en local storage
      this.setUserData(response?.token);


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
