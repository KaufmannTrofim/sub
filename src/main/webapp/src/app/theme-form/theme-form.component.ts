import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { Theme } from '../model/theme';
import { ThemeService } from '../services/theme.service';
import { TagService } from '../services/tag.service';
import { Observable } from 'rxjs';
import { MatDialogRef } from '@angular/material';
import { Tag } from '../model/tag';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-theme-form',
  templateUrl: './theme-form.component.html',
  styleUrls: ['./theme-form.component.css']
})

export class ThemeFormComponent implements OnInit {

  theme: Theme = new Theme();
  allTags: Tag[] = new Array();
  tagCtrl = new FormControl();
  filteredTags: Observable<Tag[]>;
  isEdit: Boolean = false;

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private themeService: ThemeService,
              private tagService: TagService,
              public formRef: MatDialogRef<ThemeFormComponent>,
              @Inject(MAT_DIALOG_DATA) theme: Theme) {
                if (theme !== null) {
                  this.theme = theme;
                  this.isEdit = true;
                }
              }

  ngOnInit() {
    this.getTags();
  }

  postTheme() {
    this.themeService.postTheme(this.theme)
        .subscribe((result: any) => {
          this.formRef.close(this.theme);
        },
        error => {
          console.log(error);
        });
  }

  updateTheme() {
    this.themeService.updateTheme(this.theme)
        .subscribe((result: any) => {
          this.formRef.close(this.theme);
        },
        error => {
          console.log(error);
        });
  }

  getTags() {
    this.tagService.getTags().subscribe(tags => {
      tags.forEach(tag => {
        if (this.theme.tags.every(t => t.name.trim().toLowerCase() !== tag.name.trim().toLowerCase())) {
          this.allTags.push(tag);
        }
      });
      this.filteredTags = this.tagCtrl.valueChanges.pipe(
        startWith(null),
        map((filter: string | null) => filter ? this._search(filter) : this.allTags));
      });
  }

  onClose(): void {
    this.formRef.close();
  }

  private _search(value: any): Tag[] {
    if (value.name === null || value.name === undefined) {
      return this.allTags.filter(tag => tag.name.trim().toLowerCase().indexOf(value.toLowerCase()) === 0);
    } else {
      return this.allTags.filter(tag => tag.name.trim().toLowerCase().indexOf(value.name.toLowerCase()) === 0);
    }
  }

  addTag(inputEvent: MatChipInputEvent): void {
      const input = inputEvent.input;
      const value = inputEvent.value.trim().toLowerCase();

      if ((value || '').trim()) {
        if (this.theme.tags.every(tag => value !== tag.name.trim().toLowerCase())) {
            if (!this.allTags.some(tag => {
              if (tag.name.trim().toLowerCase() === value) {
                this.theme.tags.push(tag);
                this.allTags = this.allTags.filter(t => value !== t.name.trim().toLowerCase());
                return true;
              }
            })) {
              this.theme.tags.push({id: null, name: value});
            }
        }
      }

      if (input) {
        input.value = '';
      }

      this.tagCtrl.setValue(null);
  }

  removeTag(value: Tag): void {
    if (value.id !== null && value.id !== undefined) {
      this.allTags.push(value);
    }
    this.theme.tags = this.theme.tags.filter(tag => tag.name.trim().toLowerCase() !== value.name.trim().toLowerCase());
  }

  selectedTag(event: MatAutocompleteSelectedEvent): void {
    const tag: Tag = event.option.value;
    this.theme.tags.push(tag);
    this.allTags = this.allTags.filter(t => tag.name.trim().toLowerCase() !== t.name.trim().toLowerCase());
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }
}
