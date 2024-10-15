import { inject, Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { environment } from 'src/environments/environment';
import { Auth2Service } from '../auth2/auth2.service';
import { Preferences } from '@capacitor/preferences';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  #authService = inject(AuthService);


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


  /**
   * Método asincrónico que obtiene el perfil del usuario.
   *
   * Este método utiliza un token de autenticación para realizar una solicitud HTTP
   * al servidor y obtener la información del perfil del usuario.
   *
   * @returns {Promise<any>} Una promesa que se resuelve con la respuesta del servidor
   * que contiene la información del perfil del usuario.
   * @throws {Error} Lanza un error si la solicitud HTTP falla.
   */
  async perfil() {

    // Token de autenticación
    const token = await this.#authService.obtenerToken();

    const options = {
      url: environment.serverUrl+'auth/profile',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await CapacitorHttp.get(options);

      return response;
    } catch (e) {
      throw e;
    }
  }
}
