import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelLoadingComponent } from './model-loading.component';

describe('ModelLoadingComponent', () => {
  let component: ModelLoadingComponent;
  let fixture: ComponentFixture<ModelLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelLoadingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
