import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalCorredorComponent } from './global-corredor.component';

describe('GlobalCorredorComponent', () => {
  let component: GlobalCorredorComponent;
  let fixture: ComponentFixture<GlobalCorredorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlobalCorredorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GlobalCorredorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
