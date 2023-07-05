import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuGruposComponent } from './menu-grupos.component';

describe('MenuGruposComponent', () => {
  let component: MenuGruposComponent;
  let fixture: ComponentFixture<MenuGruposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuGruposComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuGruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
