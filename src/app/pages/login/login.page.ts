import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Keyboard } from '@capacitor/keyboard';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [IonicModule, FormsModule, CommonModule]
})
export class LoginPage {
  email: string = '';
  password: string = '';

  // Referencia al input
  @ViewChild('emailInput', { static: false }) emailInput!: ElementRef;

  constructor(private router: Router) {}

  ionViewDidEnter() {
    setTimeout(() => {
      this.mostrarTeclado();
    }, 300);
  }

  async mostrarTeclado() {
    const input = this.emailInput?.nativeElement;
    if (input) {
      input.focus(); // fuerza el foco
      await Keyboard.setAccessoryBarVisible({ isVisible: true });
      await Keyboard.show(); // muestra el teclado
    }
  }

  onLogin() {
    if (this.email && this.password) {
      console.log('Login correcto con:', this.email);
      this.router.navigateByUrl('/jugadores');
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }

  irARegistro() {
    console.log('Botón de registro pulsado');
    this.router.navigateByUrl('/registro');
  }
}
