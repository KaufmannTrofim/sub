import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { EventService } from '../services/event.service';
import { EventFormComponent } from './event-form.component';
import { of } from 'rxjs';

describe('EventFormComponent', () => {
  let component: EventFormComponent;
  let fixture: ComponentFixture<EventFormComponent>;
  let mockEventService;
  let EVENT;

  beforeEach(async(() => {
    mockEventService = jasmine.createSpyObj('Spy', ['postEvent']);

    TestBed.configureTestingModule({
      declarations: [ EventFormComponent ],
      providers: [
        { provide: EventService, useValue: mockEventService }
      ],
      imports: [ FormsModule, HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventFormComponent);
    component = new EventFormComponent(mockEventService);

    EVENT = [
      { id: 1,
        name: 'Событие1',
        date: '22/12/2018',
        themesId: new Array<Number>()}];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('postEvent', () => {

    it('should call postEvent', () => {
      mockEventService.postEvent.and.returnValue(of(true));
      component.event = EVENT;
      component.postEvent();

      expect(mockEventService.postEvent).toHaveBeenCalled();
    });
  });
});
