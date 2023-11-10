import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CriarCategoriaPage } from './criar-categoria.page';

describe('CriarCategoriaPage', () => {
  let component: CriarCategoriaPage;
  let fixture: ComponentFixture<CriarCategoriaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CriarCategoriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
