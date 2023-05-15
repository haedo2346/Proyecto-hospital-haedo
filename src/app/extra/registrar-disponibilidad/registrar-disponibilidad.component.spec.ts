import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarDisponibilidadComponent } from './registrar-disponibilidad.component';

describe('RegistrarDisponibilidadComponent', () => {
  let component: RegistrarDisponibilidadComponent;
  let fixture: ComponentFixture<RegistrarDisponibilidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarDisponibilidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarDisponibilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
