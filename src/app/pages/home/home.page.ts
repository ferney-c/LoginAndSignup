import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonMenu, IonButtons, IonMenuButton } from '@ionic/angular/standalone';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonMenuButton, IonButtons, IonMenu, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class HomePage implements OnInit {

  my: any;

  constructor() { }

  userService = inject(UserService);

  ngOnInit() {
    this.getMy();
  }

  async getMy() {
    const response = await this.userService.getMy();
    this.my = response.data;
  }

}
