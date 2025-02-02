import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaPalmaresComponent } from './vista-palmares.component';

describe('VistaPalmaresComponent', () => {
  let component: VistaPalmaresComponent;
  let fixture: ComponentFixture<VistaPalmaresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VistaPalmaresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VistaPalmaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
