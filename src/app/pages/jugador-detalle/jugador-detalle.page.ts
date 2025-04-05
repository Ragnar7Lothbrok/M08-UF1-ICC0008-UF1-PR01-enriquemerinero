import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-jugador-detalle',
  templateUrl: './jugador-detalle.page.html',
  styleUrls: ['./jugador-detalle.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class JugadorDetallePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
