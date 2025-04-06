import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JugadoresService {
  private apiUrl = 'https://api.balldontlie.io/v1/players';

  constructor(private http: HttpClient) {}

  getJugadores(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: '0dc5d8fe-4516-4ed5-8a28-b80a0320b55a'
    });

    return this.http.get(this.apiUrl, { headers });
  }
}
