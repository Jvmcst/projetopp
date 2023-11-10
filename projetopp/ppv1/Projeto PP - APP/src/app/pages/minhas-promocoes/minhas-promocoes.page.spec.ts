import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MinhasPromocoesPage } from './minhas-promocoes.page';

describe('MinhasPromocoesPage', () => {
  let component: MinhasPromocoesPage;
  let fixture: ComponentFixture<MinhasPromocoesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MinhasPromocoesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
