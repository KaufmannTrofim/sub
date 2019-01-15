import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { EventComponent } from './event.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { Event } from '../model/event';

describe('EventComponent', () => {
  let component: EventComponent;
  let fixture: ComponentFixture<EventComponent>;
  let EVENT: Event;

  @Component({
    selector: 'app-event-delete',
    template: '<div></div>'
  })
  class FakeThemeDeleteComponent {
    @Input() event: Event;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EventComponent,
        FakeThemeDeleteComponent
      ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventComponent);
    component = fixture.componentInstance;

    EVENT = {
      id: 1,
      name: 'Событие1',
      date: '22/12/2018',
      themesId: [1, 2, 3]};
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct event', () => {
    fixture.componentInstance.event = EVENT;

    expect(fixture.componentInstance.event.name).toEqual('Событие1');
  });

  it('should render the event name in an anchor tag', () => {

    fixture.componentInstance.event = EVENT;
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('a')).nativeElement.textContent).toContain('Событие1');
    expect(fixture.debugElement.query(By.css('tbody')).nativeElement.textContent).toContain('22/12/2018');
    expect(fixture.debugElement.query(By.css('tbody')).nativeElement.textContent).toContain([1, 2, 3]);
  });
});
