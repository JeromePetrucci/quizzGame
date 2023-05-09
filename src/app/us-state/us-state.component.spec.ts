import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsStateComponent } from './us-state.component';

describe('UsStateComponent', () => {
  let component: UsStateComponent;
  let fixture: ComponentFixture<UsStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsStateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
