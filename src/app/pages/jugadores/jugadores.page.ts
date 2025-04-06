import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { JugadoresService } from '../../services/jugadores.service';

@Component({
  selector: 'app-jugadores',
  standalone: true,
  templateUrl: './jugadores.page.html',
  styleUrls: ['./jugadores.page.scss'],
  imports: [IonicModule, CommonModule]
})
export class JugadoresPage implements OnInit {
  jugadores: any[] = [];

  constructor(
    private router: Router,
    private jugadoresService: JugadoresService
  ) {}

  ngOnInit() {
    this.jugadoresService.getJugadores().subscribe((response) => {
      this.jugadores = response.data;
    });
  }

  abrirCamara(jugador: any) {
    console.log('📷 Cámara para:', jugador.first_name);
  }

  compartirJugador(jugador: any) {
    console.log('📤 Compartir jugador:', jugador.first_name);
  }

  verDetalle(jugador: any) {
    this.router.navigateByUrl('/jugador-detalle', { state: { jugador } });
  }
}
