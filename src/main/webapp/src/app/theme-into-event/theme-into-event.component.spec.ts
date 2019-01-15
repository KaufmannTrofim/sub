import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeIntoEventComponent } from './theme-into-event.component';

describe('ThemeIntoEventComponent', () => {
  let component: ThemeIntoEventComponent;
  let fixture: ComponentFixture<ThemeIntoEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemeIntoEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeIntoEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
