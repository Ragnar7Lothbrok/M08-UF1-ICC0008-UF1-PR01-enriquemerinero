import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jugadores',
  standalone: true,
  templateUrl: './jugadores.page.html',
  styleUrls: ['./jugadores.page.scss'],
  imports: [IonicModule, CommonModule]
})
export class JugadoresPage {
  jugadores = [
    { nombre: 'Luka', apellidos: 'Dončić', altura: 201, peso: 104, equipo: 'Dallas Mavericks' },
    { nombre: 'Victor', apellidos: 'Wembanyama', altura: 224, peso: 95, equipo: 'San Antonio Spurs' },
    { nombre: 'Scoot', apellidos: 'Henderson', altura: 191, peso: 92, equipo: 'Portland Trail Blazers' }
  ];

  abrirCamara(jugador: any) {
    console.log('📷 Cámara para:', jugador.nombre);
    // Aquí va la integración futura con @capacitor/camera
  }

  compartirJugador(jugador: any) {
    console.log('📤 Compartir jugador:', jugador.nombre);
    // Aquí va la integración futura con @capacitor/share
  }
}
