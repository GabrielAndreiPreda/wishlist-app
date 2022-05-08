import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'wishlist-app-editing-form',
  templateUrl: './editing-form.component.html',
  styleUrls: ['./editing-form.component.scss'],
})
export class EditingFormComponent implements OnInit {
  @Input() showHint = false;
  @Input() maxLength = 255;
  @Input() placeholder = '';
  @Input() label = '';
  @Input() defaultValue = '';
  @Input() color = 'primary';

  @ViewChild('input') inputElement!: ElementRef;

  @Output() formEnterEvent = new EventEmitter<string>();
  @Output() formChangeEvent = new EventEmitter<string>();

  hintLabel = '';

  constructor() {}

  formControl = new FormControl('', [
    Validators.pattern('^.*[a-zA-Z]+(.|\\s)*$'),
    Validators.maxLength(this.maxLength),
  ]);

  ngOnInit(): void {
    this.formControl.setValue(this.defaultValue);
    this.hintLabel = this.showHint ? `Max ${this.maxLength} characters` : '';
  }
  ngAfterViewInit() {
    //Produces an error, needs a better way of focusing the input
    this.inputElement.nativeElement.focus();
  }

  resetWishlistForm() {
    this.formControl.reset();
  }

  sendFormValue() {
    if (this.formControl.status === 'VALID') {
      this.formChangeEvent.emit(this.formControl.value);
    }
  }
  saveFormValue() {
    if (this.formControl.status === 'VALID') {
      this.formEnterEvent.emit();
    }
  }
}
