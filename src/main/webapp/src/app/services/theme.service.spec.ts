import { TestBed, getTestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';
import { Theme } from '../model/theme';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ThemeService', () => {
  let injector: TestBed;
  let themeService: ThemeService;
  let httpMock: HttpTestingController;
  let THEME: Theme;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ ThemeService ]
    });

    injector = getTestBed();
    themeService = injector.get(ThemeService);
    httpMock = injector.get(HttpTestingController);

    THEME = {
      id: 0,
      topic: 'Тема0',
      description: 'Описание',
      tags: new Array<String>(), lecturer: 'Лектор',
      assigned: new Array<String>(), confirmed: true,
      createdAt: new Date()};
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const service: ThemeService = TestBed.get(ThemeService);
    expect(service).toBeTruthy();
  });

  describe('getThemes', () => {
    const THEMES: Theme[] = [
      { id: 1,
        topic: 'Тема1',
        description: 'Описание',
        tags: new Array<String>(), lecturer: 'Лектор',
        assigned: new Array<String>(), confirmed: true,
        createdAt: new Date()},
      { id: 2,
        topic: 'Тема2',
        description: 'Описание',
        tags: new Array<String>(), lecturer: 'Лектор',
        assigned: new Array<String>(), confirmed: false,
        createdAt: new Date()},
      { id: 3,
        topic: 'Тема3',
        description: 'Описание',
        tags: new Array<String>(), lecturer: 'Лектор',
        assigned: new Array<String>(), confirmed: true,
        createdAt: new Date()}
    ];

    it('should return expected themes (called once)', () => {
      themeService.getThemes().subscribe(themes => {
        expect(themes.length).toBe(3);
        expect(themes).toEqual(THEMES);
      });

      const req = httpMock.expectOne(themeService.themeApiUrl);
      expect(req.request.method).toBe('GET');
      req.flush(THEMES);
    });

    it('should return expected themes (called multiple times)', () => {
      themeService.getThemes().subscribe();
      themeService.getThemes().subscribe();
      themeService.getThemes().subscribe(
        themes => expect(themes).toEqual(THEMES, 'should return expected themes'),
        fail
      );

      const req = httpMock.match(themeService.themeApiUrl);
      expect(req.length).toEqual(3, 'calls to getThemes()');

      req[0].flush([]);
      req[1].flush(THEMES[1]);
      req[2].flush(THEMES);
    });

    it('should be OK returning no themes', () => {
      themeService.getThemes().subscribe(
        themes => expect(themes.length).toEqual(0, 'should have empty themes array'),
        fail
      );

      const req = httpMock.expectOne(themeService.themeApiUrl);
      req.flush([]);
    });

    it('should turn 404 into a user-friendly error', () => {
      const msg = '404 Not Found';
      themeService.getThemes().subscribe(
        themes => fail('expect to fail'),
        error => expect(error.message).toContain(msg)
      );

      const req = httpMock.expectOne(themeService.themeApiUrl);
      req.flush(msg, {status: 404, statusText: 'Not Found'});
    });
  });

  describe('getTheme', () => {
    it('should return an Observable<Theme>', () => {
      themeService.getTheme(THEME.id).subscribe(theme => {
        expect(theme).toEqual(THEME);
      });

      const req = httpMock.expectOne(themeService.themeApiUrl + '/' + THEME.id);
      expect(req.request.method).toBe('GET');
      req.flush(THEME);
    });
  });

  describe('postTheme', () => {
    it('returned Observable should match the right data', () => {
      themeService.postTheme(THEME).subscribe(theme => {
        expect(theme).toEqual(THEME);
      });

      const req = httpMock.expectOne(themeService.themeApiUrl);
      expect(req.request.method).toBe('POST');
      req.flush(THEME);
    });
  });

  describe('deleteTheme', () => {
    it('should delete the correct theme', () => {
        themeService.deleteTheme(THEME).subscribe(theme => {
        expect(theme).toBe(THEME);
      });

      const req = httpMock.expectOne(themeService.themeApiUrl + '/' + THEME.id);
      expect(req.request.method).toBe('DELETE');
      req.flush(THEME);
    });
  });
});
