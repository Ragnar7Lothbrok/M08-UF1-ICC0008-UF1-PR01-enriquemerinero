import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class FavoritosService {
  constructor(
    private firestore: Firestore,
    private afAuth: AngularFireAuth
  ) {}

  // ✅ Guarda el jugador solo si no está ya en favoritos
  async guardarFavorito(jugador: any) {
    const user = await this.afAuth.currentUser;
    if (!user) throw new Error('Usuario no autenticado');

    const colRef = collection(this.firestore, `usuarios/${user.uid}/favoritos`);
    const snapshot = await getDocs(colRef);

    const yaExiste = snapshot.docs.some(doc => doc.data()['id'] === jugador.id);
    if (yaExiste) {
      console.log('⚠️ Ya estaba en favoritos');
      return;
    }

    return addDoc(colRef, jugador);
  }

  // ✅ Obtiene todos los favoritos del usuario autenticado
  async obtenerFavoritos(): Promise<any[]> {
    const user = await this.afAuth.currentUser;
    if (!user) throw new Error('Usuario no autenticado');

    const colRef = collection(this.firestore, `usuarios/${user.uid}/favoritos`);
    const snapshot = await getDocs(colRef);
    return snapshot.docs.map(doc => doc.data());
  }

  // ✅ Elimina un favorito por el ID del jugador
  async eliminarFavorito(jugadorId: number) {
    const user = await this.afAuth.currentUser;
    if (!user) throw new Error('Usuario no autenticado');

    const colRef = collection(this.firestore, `usuarios/${user.uid}/favoritos`);
    const snapshot = await getDocs(colRef);

    const docBorrar = snapshot.docs.find(doc => doc.data()['id'] === jugadorId);
    if (docBorrar) {
      await deleteDoc(docBorrar.ref);
      console.log('🗑️ Jugador eliminado de favoritos');
    } else {
      console.warn('❌ No se encontró el jugador en favoritos');
    }
  }
}
