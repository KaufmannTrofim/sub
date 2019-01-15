import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ThemeListComponent } from './theme-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ThemeService } from '../services/theme.service';
import { of } from 'rxjs';
import { Theme } from '../model/theme';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';



describe('ThemeListComponent', () => {
  let component: ThemeListComponent;
  let fixture: ComponentFixture<ThemeListComponent>;
  let mockThemeService;
  let THEMES;

  @Component({
    selector: 'app-theme, app-theme-form',
    template: '<div></div>'
  })
  class FakeThemeComponent {
    @Input() theme: Theme;
  }

  beforeEach(() => {
    mockThemeService = jasmine.createSpyObj('Spy', ['getThemes', 'updateListTheme', 'deleteTheme']);

    TestBed.configureTestingModule({
      declarations: [
        ThemeListComponent,
        FakeThemeComponent
      ],
      providers: [
        { provide: ThemeService, useValue: mockThemeService }
      ],
      imports: [ HttpClientTestingModule ]
    });
    fixture = TestBed.createComponent(ThemeListComponent);

    THEMES = [
      { id: 1,
        topic: 'Тема1',
        description: 'Описание',
        tags: new Array<String>(), lecturer: 'Лектор',
        assigned: new Array<String>(), confirmed: true},
      { id: 2,
        topic: 'Тема2',
        description: 'Описание',
        tags: new Array<String>(), lecturer: 'Лектор',
        assigned: new Array<String>(), confirmed: false},
      { id: 3,
        topic: 'Тема3',
        description: 'Описание',
        tags: new Array<String>(), lecturer: 'Лектор',
        assigned: new Array<String>(), confirmed: true}
    ];

    component = new ThemeListComponent(mockThemeService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set themes correctly from the service', () => {
    mockThemeService.getThemes.and.returnValue(of(THEMES));
    fixture.detectChanges();

    expect(fixture.componentInstance.themes.length).toBe(3);
  });

  it('should create one app-theme for each theme', () => {
    mockThemeService.getThemes.and.returnValue(of(THEMES));
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('app-theme')).length).toBe(3);
  });

  it('should properly create and clean the app-theme-form', () => {
    mockThemeService.getThemes.and.returnValue(of([]));
    fixture.componentInstance.formIsOpen = false;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('app-theme-form')) === null).toBe(false);

    mockThemeService.getThemes.and.returnValue(of([]));
    fixture.componentInstance.formIsOpen = true;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('app-theme-form')) === null).toBe(true);
  });

  describe('deleteTheme', () => {

    it('should remove the indicated theme from the themes list', () => {
      mockThemeService.deleteTheme.and.returnValue(of(true));
      component.themes = THEMES;
      component.deleteTheme(THEMES[2]);

      expect(component.themes.length).toBe(2);
      expect(component.themes[0] !== THEMES[2]);
      expect(component.themes[1] !== THEMES[2]);
    });

    it('should call deleteTheme', () => {
      mockThemeService.deleteTheme.and.returnValue(of(true));
      component.themes = THEMES;

      component.deleteTheme(THEMES[2]);

      expect(mockThemeService.deleteTheme).toHaveBeenCalledWith(THEMES[2]);
    });
  });

  describe('getThemes', () => {

    it('should get themes list', () => {
      mockThemeService.getThemes.and.returnValue(of(THEMES));

      component.getThemes();

      expect(mockThemeService.getThemes).toHaveBeenCalled();
    });
  });
});
