import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JugadorDetallePage } from './jugador-detalle.page';

describe('JugadorDetallePage', () => {
  let component: JugadorDetallePage;
  let fixture: ComponentFixture<JugadorDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JugadorDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
