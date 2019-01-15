import { TestBed, getTestBed } from '@angular/core/testing';
import { EventService } from './event.service';
import { Event } from '../model/event';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('EventService', () => {
  let injector: TestBed;
  let eventService: EventService;
  let httpMock: HttpTestingController;
  let EVENT: Event;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ EventService ]
    });

    injector = getTestBed();
    eventService = injector.get(EventService);
    httpMock = injector.get(HttpTestingController);

    EVENT = {
      id: 0,
      name: 'Event0',
      date: '22/12/2018',
      themesId: new Array<Number>() };
  });

  afterEach(() => {
    httpMock.verify();
  });


  it('should be created', () => {
    const service: EventService = TestBed.get(EventService);
    expect(service).toBeTruthy();
  });

  describe('getEvents', () => {
    const EVENTS: Event[] = [
      { id: 1,
        name: 'Event1',
        date: '22/12/2018',
        themesId: new Array<Number>() },
      { id: 2,
        name: 'Event2',
        date: '22/12/2018',
        themesId: new Array<Number>() },
      { id: 3,
        name: 'Event3',
        date: '22/12/2018',
        themesId: new Array<Number>() }
    ];

    it('should return expected events (called once)', () => {
      eventService.getEvents().subscribe(events => {
        expect(events.length).toBe(3);
        expect(events).toEqual(EVENTS);
      });

      const req = httpMock.expectOne(eventService.eventApiUrl);
      expect(req.request.method).toBe('GET');
      req.flush(EVENTS);
    });

    it('should return expected events (called multiple times)', () => {
      eventService.getEvents().subscribe();
      eventService.getEvents().subscribe();
      eventService.getEvents().subscribe(
        events => expect(events).toEqual(EVENTS, 'should return expected events'),
        fail
      );

      const req = httpMock.match(eventService.eventApiUrl);
      expect(req.length).toEqual(3, 'calls to getEvents()');

      req[0].flush([]);
      req[1].flush(EVENTS[1]);
      req[2].flush(EVENTS);
    });

    it('should be OK returning no events', () => {
      eventService.getEvents().subscribe(
        events => expect(events.length).toEqual(0, 'should have empty events array'),
        fail
      );

      const req = httpMock.expectOne(eventService.eventApiUrl);
      req.flush([]);
    });

    it('should turn 404 into a user-friendly error', () => {
      const msg = '404 Not Found';
      eventService.getEvents().subscribe(
        events => fail('expect to fail'),
        error => expect(error.message).toContain(msg)
      );

      const req = httpMock.expectOne(eventService.eventApiUrl);
      req.flush(msg, {status: 404, statusText: 'Not Found'});
    });
  });

  describe('postEvent', () => {
    it('returned Observable should match the right data', () => {
      eventService.postEvent(EVENT).subscribe(events => {
        expect(events).toEqual(EVENT);
      });

      const req = httpMock.expectOne(eventService.eventApiUrl);
      expect(req.request.method).toBe('POST');
      req.flush(EVENT);
    });
  });

  describe('deleteEvent', () => {
    it('should delete the correct event', () => {
      eventService.deleteEvent(EVENT).subscribe(event => {
        expect(event).toBe(EVENT);
      });

      const req = httpMock.expectOne(eventService.eventApiUrl + '/' + EVENT.id);
      expect(req.request.method).toBe('DELETE');
      req.flush(EVENT);
    });
  });
});
