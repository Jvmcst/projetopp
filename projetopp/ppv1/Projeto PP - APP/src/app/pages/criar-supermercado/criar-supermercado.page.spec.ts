import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CriarSupermercadoPage } from './criar-supermercado.page';

describe('CriarSupermercadoPage', () => {
  let component: CriarSupermercadoPage;
  let fixture: ComponentFixture<CriarSupermercadoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CriarSupermercadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
