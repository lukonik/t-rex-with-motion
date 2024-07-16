import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileNotSupportedComponent } from './mobile-not-supported.component';

describe('MobileNotSupportedComponent', () => {
  let component: MobileNotSupportedComponent;
  let fixture: ComponentFixture<MobileNotSupportedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileNotSupportedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileNotSupportedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
