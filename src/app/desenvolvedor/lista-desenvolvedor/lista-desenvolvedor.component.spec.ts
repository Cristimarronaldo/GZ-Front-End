import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDesenvolvedorComponent } from './lista-desenvolvedor.component';

describe('ListaDesenvolvedorComponent', () => {
  let component: ListaDesenvolvedorComponent;
  let fixture: ComponentFixture<ListaDesenvolvedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaDesenvolvedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDesenvolvedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
