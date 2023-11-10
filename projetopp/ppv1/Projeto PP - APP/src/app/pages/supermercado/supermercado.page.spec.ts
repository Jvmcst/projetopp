import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SupermercadoPage } from './supermercado.page';

describe('SupermercadoPage', () => {
  let component: SupermercadoPage;
  let fixture: ComponentFixture<SupermercadoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SupermercadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
