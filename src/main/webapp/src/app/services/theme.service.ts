import { Injectable } from '@angular/core';
import { Theme } from '../model/theme';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(private http: HttpClient) { }

  getThemes(): Observable<Theme[]> {
    return this.http.get<Theme[]>('/themes/spa');
  }

  getTheme(id: number): Observable<Theme> {
    return this.http.get<Theme>('/themes/' + id);
  }

  postTheme(theme: Theme) {
    return this.http.post('/themes/spa', theme);
  }

  deleteTheme(theme: Theme): Observable<{}> {
    return this.http.delete('/themes/' + theme.id);
  }

  updateTheme(theme: Theme) {
    return this.http.patch('/themes/spa', theme);
  }
}
