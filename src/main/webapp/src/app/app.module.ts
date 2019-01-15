import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ThemeService } from './services/theme.service';
import { ThemeListComponent } from './theme-list/theme-list.component';
import { ThemeFormComponent } from './theme-form/theme-form.component';
import { ThemeDeleteComponent } from './theme-delete/theme-delete.component';
import { EventComponent } from './event/event.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventService } from './services/event.service';
import { EventFormComponent } from './event-form/event-form.component';
import { EventDeleteComponent } from './event-delete/event-delete.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TagService } from './services/tag.service';
import { AdminComponent } from './admin/admin.component';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { MatCheckboxModule, MatInputModule, MatFormFieldModule, MatTableModule, MatMenuModule, MatExpansionModule,
         MatButtonModule, MatSnackBarModule, MatIconModule, MatToolbarModule, MatTabsModule, MatCardModule,
         MatPaginatorModule, MatSidenavModule, MatDialogModule, MatChipsModule, MatAutocompleteModule,
         MatProgressSpinnerModule, MatGridListModule } from '@angular/material';
import { EventPageComponent } from './event-page/event-page.component';
import { ThemeIntoEventComponent } from './theme-into-event/theme-into-event.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';


const appRoutes: Routes = [
  { path: '', component: EventListComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'events/:id', component: EventPageComponent },
  { path: 'events', redirectTo: '', pathMatch: 'full'},
  { path: 'themes', component: ThemeListComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ThemeListComponent,
    ThemeFormComponent,
    ThemeDeleteComponent,
    EventComponent,
    EventListComponent,
    EventFormComponent,
    EventDeleteComponent,
    AdminComponent,
    UserListComponent,
    EventPageComponent,
    ThemeIntoEventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatTabsModule,
    MatCardModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatSidenavModule,
    MatGridListModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  entryComponents: [ThemeFormComponent, EventFormComponent],
  providers: [ThemeService, EventService, TagService],
  bootstrap: [AppComponent]
})
export class AppModule { }
