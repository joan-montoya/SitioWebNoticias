import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuConfiguracionComponent } from './menu-configuracion.component';

describe('MenuConfiguracionComponent', () => {
  let component: MenuConfiguracionComponent;
  let fixture: ComponentFixture<MenuConfiguracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuConfiguracionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuConfiguracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
