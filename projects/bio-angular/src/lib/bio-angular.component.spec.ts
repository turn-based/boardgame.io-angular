import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BioAngularComponent } from './bio-angular.component';

describe('BioAngularComponent', () => {
  let component: BioAngularComponent;
  let fixture: ComponentFixture<BioAngularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BioAngularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BioAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
