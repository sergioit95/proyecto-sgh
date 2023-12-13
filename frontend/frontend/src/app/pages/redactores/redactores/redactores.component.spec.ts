import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedactoresComponent } from './redactores.component';

describe('RedactoresComponent', () => {
  let component: RedactoresComponent;
  let fixture: ComponentFixture<RedactoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedactoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedactoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
