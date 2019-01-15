import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ThemeFormComponent } from './theme-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ThemeService } from '../services/theme.service';
import { of } from 'rxjs';

describe('ThemeFormComponent', () => {
  let component: ThemeFormComponent;
  let fixture: ComponentFixture<ThemeFormComponent>;
  let mockThemeService;
  let THEME;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemeFormComponent ],
      providers: [
        { provide: ThemeService, useValue: mockThemeService }
      ],
      imports: [ FormsModule, HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    mockThemeService = jasmine.createSpyObj('Spy', ['postTheme']);

    fixture = TestBed.createComponent(ThemeFormComponent);
    component = new ThemeFormComponent(mockThemeService);
    fixture.detectChanges();

    THEME = [
      { id: 1,
        topic: 'Тема1',
        description: 'Описание',
        tags: new Array<String>(), lecturer: 'Лектор',
        assigned: new Array<String>(), confirmed: true}];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('postTheme', () => {

    it('should call postTheme', () => {
      mockThemeService.postTheme.and.returnValue(of(true));
      component.theme = THEME;
      component.postTheme();

      expect(mockThemeService.postTheme).toHaveBeenCalled();
    });
  });
});
