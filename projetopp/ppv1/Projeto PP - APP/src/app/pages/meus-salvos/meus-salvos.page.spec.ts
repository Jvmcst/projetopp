import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MeusSalvosPage } from './meus-salvos.page';

describe('MeusSalvosPage', () => {
  let component: MeusSalvosPage;
  let fixture: ComponentFixture<MeusSalvosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MeusSalvosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
