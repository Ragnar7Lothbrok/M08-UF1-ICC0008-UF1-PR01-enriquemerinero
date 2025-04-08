import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../services/auth.service';
import { Firestore } from '@angular/fire/firestore';
import { doc, setDoc } from 'firebase/firestore';

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
  confirmPassword: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private firestore: Firestore
  ) {}

  async onRegister() {
    console.log('📥 Iniciando registro...');
    console.log('📧 Email:', this.email);

    if (!this.email || !this.password || !this.confirmPassword) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    if (!this.esEmailValido(this.email)) {
      alert('Por favor, introduce un correo válido.');
      return;
    }

    if (this.password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    try {
      const cred = await this.authService.register(this.email, this.password);
      console.log('✅ Usuario registrado:', cred.user?.email);

      const uid = cred.user?.uid;
      if (!uid) throw new Error('No se pudo obtener el UID del usuario');

      const userData = {
        email: this.email,
        creadoEn: new Date(),
        favoritos: [],
      };

      try {
        await setDoc(doc(this.firestore, 'usuarios', uid), userData);
        alert('✅ Cuenta registrada correctamente');
      } catch (firestoreError) {
        console.error('❌ Error al guardar en Firestore:', firestoreError);
        alert('Usuario creado, pero hubo un error al guardar los datos.');
      }

      this.router.navigateByUrl('/login');

    } catch (error: any) {
      console.error('❌ Error en el registro:', error);
      if (error.code === 'auth/email-already-in-use') {
        alert('Este correo ya está registrado.');
      } else if (error.code === 'auth/weak-password') {
        alert('La contraseña es demasiado débil.');
      } else {
        alert('❌ Error al registrarse: ' + error.message);
      }
    }
  }

  private esEmailValido(email: string): boolean {
    const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return patron.test(email);
  }

  irALogin() {
    this.router.navigateByUrl('/login');
  }
}
