import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jugador-detalle',
  standalone: true,
  templateUrl: './jugador-detalle.page.html',
  styleUrls: ['./jugador-detalle.page.scss'],
  imports: [IonicModule, CommonModule]
})
export class JugadorDetallePage {
  jugador: any;
  esFavorito = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    console.log('📦 history.state:', history.state); // << para depuración

    const datos = history.state.jugador;
    if (datos) {
      this.jugador = datos;
    } else {
      console.warn('⚠️ No se recibió ningún jugador en el estado');
    }
  }

  toggleFavorito() {
    this.esFavorito = !this.esFavorito;
    console.log(`${this.jugador?.nombre} es favorito:`, this.esFavorito);
    // Aquí en el Nivel 3 puedes guardar en Firebase
  }
}
