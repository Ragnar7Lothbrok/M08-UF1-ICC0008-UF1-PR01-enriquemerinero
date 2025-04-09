import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { JugadoresService } from '../../services/jugadores.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Share } from '@capacitor/share';

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
    Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Prompt
    }).then(image => {
      const base64 = `data:image/jpeg;base64,${image.base64String}`;
      jugador.imagen = base64; // ✅ le añadimos temporalmente la imagen
  
      this.verDetalle(jugador); // lo pasamos al detalle
    });
  }

  async compartirJugador(jugador: any) {
    await Share.share({
      title: 'Jugador de la NBA',
      text: `¡Mira este jugador! ${jugador.first_name} ${jugador.last_name}`,
      dialogTitle: 'Compartir jugador'
    });
  }

  verDetalle(jugador: any) {
    this.router.navigateByUrl('/jugador-detalle', { state: { jugador } });
  }
}
