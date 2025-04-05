import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  imports: [IonicModule, FormsModule, CommonModule],
})
export class RegistroPage {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onRegister() {
    if (this.email && this.password) {
      console.log('Registro exitoso con:', this.email);
      // Aquí más adelante puedes conectar con Firebase
      alert('Cuenta registrada correctamente');
      this.router.navigateByUrl('/login');
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }
  
  irALogin() {
    this.router.navigateByUrl('/login');
  }
}
