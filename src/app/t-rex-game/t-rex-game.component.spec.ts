import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TRexGameComponent } from './t-rex-game.component';

describe('TRexGameComponent', () => {
  let component: TRexGameComponent;
  let fixture: ComponentFixture<TRexGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TRexGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TRexGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
