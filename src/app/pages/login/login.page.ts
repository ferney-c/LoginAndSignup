import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonTitle,
  IonInput,
  IonButton,
  IonLabel,
  IonText,
  IonImg,
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { Auth2Service } from 'src/app/services/auth2/auth2.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonImg,
    IonText,
    IonLabel,
    IonButton,
    IonInput,
    IonContent,
    IonTitle,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
  ],
})
export class LoginPage implements OnInit {
  constructor() {}

  loginForm!: FormGroup; // Formulario de login

  isLogin = false; 

  private authService = inject(Auth2Service);
  
  ngOnInit() {
    /* Inincializamos el formulario */
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  /* Función para el login */
  login() {
    this.isLogin = true;

    this.authService.login(this.loginForm.value)
      .then((response) => {
        if (response?.data?.success === 1) {
          this.authService.navigateByUrl('/home');
          this.isLogin = false;
          this.loginForm.reset();
        }else{
          this.isLogin = false;
          this.authService.showAlert(response?.data?.message);
        }
      })
      .catch((e) => {
        this.isLogin = false;
        this.authService.showAlert(e?.error?.message);
      });
  }
}
