import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeDeleteComponent } from './theme-delete.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ThemeService } from '../services/theme.service';
import { of } from 'rxjs';

describe('ThemeDeleteComponent', () => {
  let component: ThemeDeleteComponent;
  let fixture: ComponentFixture<ThemeDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemeDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeDeleteComponent);
    component = new ThemeDeleteComponent();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
