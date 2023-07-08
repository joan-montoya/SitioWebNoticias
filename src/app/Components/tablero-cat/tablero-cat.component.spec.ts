import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableroCatComponent } from './tablero-cat.component';

describe('TableroCatComponent', () => {
  let component: TableroCatComponent;
  let fixture: ComponentFixture<TableroCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableroCatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableroCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
