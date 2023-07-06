import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableroGruposComponent } from './tablero-grupos.component';

describe('TableroGruposComponent', () => {
  let component: TableroGruposComponent;
  let fixture: ComponentFixture<TableroGruposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableroGruposComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableroGruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
