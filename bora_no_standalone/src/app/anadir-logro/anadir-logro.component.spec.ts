import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnadirLogroComponent } from './anadir-logro.component';

describe('AnadirLogroComponent', () => {
  let component: AnadirLogroComponent;
  let fixture: ComponentFixture<AnadirLogroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnadirLogroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnadirLogroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
