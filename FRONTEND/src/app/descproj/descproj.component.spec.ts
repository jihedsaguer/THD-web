import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescprojComponent } from './descproj.component';

describe('DescprojComponent', () => {
  let component: DescprojComponent;
  let fixture: ComponentFixture<DescprojComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DescprojComponent]
    });
    fixture = TestBed.createComponent(DescprojComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
