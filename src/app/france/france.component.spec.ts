import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FranceComponent } from './france.component';

describe('FranceComponent', () => {
  let component: FranceComponent;
  let fixture: ComponentFixture<FranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FranceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).true;
  });
});
