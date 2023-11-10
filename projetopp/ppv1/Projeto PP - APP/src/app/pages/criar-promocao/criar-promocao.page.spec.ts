import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CriarPromocaoPage } from './criar-promocao.page';

describe('CriarPromocaoPage', () => {
  let component: CriarPromocaoPage;
  let fixture: ComponentFixture<CriarPromocaoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CriarPromocaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
