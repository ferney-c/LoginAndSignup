import { inject, Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { environment } from 'src/environments/environment';
import { Auth2Service } from '../auth2/auth2.service';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }


  async getMy() {

    // obtener el token del storage de preferences
    const { value } = await Preferences.get({ key: 'token' });

    const options = {
      url: environment.serverUrl+'user',
      // poner el token en el header
      headers: {
        'Authorization': 'Bearer ' + value,
        'Content-Type': 'application/json',
      },
      method: 'GET',
      params: { },
    };

    try {
      const response = await CapacitorHttp.get(options);
      return response;
    } catch (e) {
      throw e;
    }

  }
}
