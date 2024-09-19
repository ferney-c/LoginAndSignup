import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonImg,
  IonLabel, IonItem, IonText, IonInput, IonIcon } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowBack } from 'ionicons/icons';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
  standalone: true,
  imports: [IonIcon, IonInput, IonText, IonItem, 
    IonLabel,
    IonImg,
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
  ],
})
export class RecuperarPage implements OnInit {
  
  recuperar!: FormGroup;

  constructor() {
    addIcons({arrowBack}); 
  }


  ngOnInit() {
    /* Inicializar el formulario */
    this.recuperar = new FormGroup({
      email: new FormControl(''),
    });
  }

  recuperarPassword() {
    console.log(this.recuperar.value);
  }
}
