import { TestBed, ComponentFixture } from '@angular/core/testing';
import { EventListComponent } from './event-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EventService } from '../services/event.service';
import { of } from 'rxjs';
import { Event } from '../model/event';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('EventListComponent', () => {
  let component: EventListComponent;
  let fixture: ComponentFixture<EventListComponent>;
  let mockEventService;
  let EVENTS;

  @Component({
    selector: 'app-event, app-event-form',
    template: '<div></div>'
  })
  class FakeEventComponent {
    @Input() event: Event;
  }

  beforeEach(() => {
    mockEventService = jasmine.createSpyObj('Spy', ['getEvents', 'updateListEvent', 'deleteEvent']);

    TestBed.configureTestingModule({
      declarations: [
        EventListComponent,
        FakeEventComponent
      ],
      providers: [
        { provide: EventService, useValue: mockEventService }
      ],
      imports: [ HttpClientTestingModule ]
    });
    fixture = TestBed.createComponent(EventListComponent);

    EVENTS = [
      { id: 1,
        name: 'Событие1',
        date: '22/12/2018',
        themesId: new Array<Number>()},
      { id: 2,
        name: 'Событие2',
        date: '22/12/2018',
        themesId: new Array<Number>()},
      { id: 3,
        name: 'Событие3',
        date: '22/12/2018',
        themesId: new Array<Number>()}
    ];

    component = new EventListComponent(mockEventService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set events correctly from the service', () => {
    mockEventService.getEvents.and.returnValue(of(EVENTS));
    fixture.detectChanges();

    expect(fixture.componentInstance.events.length).toBe(3);
  });

  it('should create one app-event for each event', () => {
    mockEventService.getEvents.and.returnValue(of(EVENTS));
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('app-event')).length).toBe(3);
  });

  it('should properly create and clean the app-theme-form', () => {
    mockEventService.getEvents.and.returnValue(of([]));
    fixture.componentInstance.formIsOpen = false;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('app-event-form')) === null).toBe(false);

    mockEventService.getEvents.and.returnValue(of([]));
    fixture.componentInstance.formIsOpen = true;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('app-event-form')) === null).toBe(true);
  });

  describe('deleteEvent', () => {

    it('should remove the indicated theme from the events list', () => {
      mockEventService.deleteEvent.and.returnValue(of(true));
      component.events = EVENTS;
      component.removeEvent(EVENTS[2]);

      expect(component.events.length).toBe(2);
      expect(component.events[0] !== EVENTS[2]);
      expect(component.events[1] !== EVENTS[2]);
    });

    it('should call removeEvent', () => {
      mockEventService.deleteEvent.and.returnValue(of(true));
      component.events = EVENTS;

      component.removeEvent(EVENTS[2]);

      expect(mockEventService.deleteEvent).toHaveBeenCalledWith(EVENTS[2]);
    });
  });

  describe('getEvents', () => {

    it('should get events list', () => {
      mockEventService.getEvents.and.returnValue(of(EVENTS));

      component.getEvents();

      expect(mockEventService.getEvents).toHaveBeenCalled();
    });
  });
});
