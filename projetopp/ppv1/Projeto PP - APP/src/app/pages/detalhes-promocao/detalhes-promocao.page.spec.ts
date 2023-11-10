import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalhesPromocaoPage } from './detalhes-promocao.page';

describe('DetalhesPromocaoPage', () => {
  let component: DetalhesPromocaoPage;
  let fixture: ComponentFixture<DetalhesPromocaoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetalhesPromocaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
