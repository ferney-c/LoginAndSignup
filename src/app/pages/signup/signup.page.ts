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
  IonHeader,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonCol,
  IonRow,
  IonLabel,
  IonButton,
  IonInput,
  IonItem,
  IonText,
  IonImg,
  IonButtons,
  IonBackButton,
  IonIcon, IonSpinner } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowBack, informationCircleOutline } from 'ionicons/icons';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Auth2Service } from 'src/app/services/auth2/auth2.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonSpinner, 
    IonIcon,
    IonBackButton,
    IonButtons,
    IonImg,
    IonText,
    IonItem,
    IonInput,
    IonButton,
    IonLabel,
    IonRow,
    IonCol,
    IonGrid,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    RouterLink,
    ReactiveFormsModule,
  ],
})
export class SignupPage implements OnInit {
  signupForm!: FormGroup; // Formulario de registro

  isSignup = false; 

  // private authService = inject(AuthService); // Servicio de autenticación
  private authService = inject(Auth2Service); // Servicio de autenticación
  
  constructor() {
    addIcons({ arrowBack, informationCircleOutline });
  }

  ngOnInit() {
    /* Inincializamos el formulario */
    this.signupForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
      ]),
    });
    /* F3rn3y16 */
    
  }

  signup() {
    this.isSignup = true;
    console.log(this.signupForm.value);

    this.authService.register(this.signupForm.value)
    .then((response) => {
      console.log(response);
      if (response?.data?.success === 1){
        this.authService.navigateByUrl('/home');
        this.isSignup = false;
        this.signupForm.reset();
      }else{
        this.isSignup = false;
        this.authService.showAlert(response?.data?.message);
      }
    })
    .catch(e => {
      console.log(e);
      this.isSignup = false;
      this.authService.showAlert(e?.error?.message);
    });
  }


  info() {
    console.log('Información');
  }
}
