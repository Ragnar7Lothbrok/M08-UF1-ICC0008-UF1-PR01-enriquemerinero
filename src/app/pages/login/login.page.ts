import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [IonicModule, FormsModule, CommonModule],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  async onLogin() {
    if (!this.email || !this.password) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    if (!this.esEmailValido(this.email)) {
      alert('Por favor, introduce un correo válido.');
      return;
    }

    try {
      const cred = await this.authService.login(this.email, this.password);
      console.log('✅ Login correcto:', cred.user);

      (document.activeElement as HTMLElement)?.blur();
      this.router.navigateByUrl('/jugadores');
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        alert('Usuario no encontrado.');
      } else if (error.code === 'auth/wrong-password') {
        alert('Contraseña incorrecta.');
      } else {
        alert('❌ Error al iniciar sesión: ' + error.message);
      }
    }
  }

  private esEmailValido(email: string): boolean {
    const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return patron.test(email);
  }

  irARegistro() {
    this.router.navigateByUrl('/registro');
  }
}
