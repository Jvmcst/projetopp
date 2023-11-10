import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PesquisarPage } from './pesquisar.page';

describe('PesquisarPage', () => {
  let component: PesquisarPage;
  let fixture: ComponentFixture<PesquisarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PesquisarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
