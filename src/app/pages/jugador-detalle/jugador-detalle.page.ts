import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FavoritosService } from '../../services/favoritos.service';

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

  constructor(
    private route: ActivatedRoute,
    private favoritosService: FavoritosService,
    private toastCtrl: ToastController
  ) {}

  async ngOnInit() {
    const datos = history.state.jugador;
    if (datos) {
      this.jugador = datos;
      await this.comprobarFavorito();
    } else {
      console.warn('⚠️ No se recibió ningún jugador en el estado');
    }
  }

  async comprobarFavorito() {
    try {
      const favoritos = await this.favoritosService.obtenerFavoritos();
      this.esFavorito = favoritos.some(fav => fav.id === this.jugador.id);
    } catch (error) {
      console.error('❌ Error al comprobar si es favorito:', error);
    }
  }

  async toggleFavorito() {
    try {
      if (this.esFavorito) {
        await this.favoritosService.eliminarFavorito(this.jugador.id);
        this.esFavorito = false;
        this.mostrarToast('❌ Jugador eliminado de favoritos');
      } else {
        await this.favoritosService.guardarFavorito(this.jugador);
        this.esFavorito = true;
        this.mostrarToast('⭐ Jugador añadido a favoritos');
      }
    } catch (error) {
      console.error('❌ Error al cambiar favorito:', error);
      this.mostrarToast('⚠️ No se pudo actualizar favorito');
    }
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}
