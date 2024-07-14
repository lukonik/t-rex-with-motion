import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskVideoPermissionComponent } from './ask-video-permission.component';

describe('AskVideoPermissionComponent', () => {
  let component: AskVideoPermissionComponent;
  let fixture: ComponentFixture<AskVideoPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AskVideoPermissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AskVideoPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
