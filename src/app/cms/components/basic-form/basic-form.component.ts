import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent implements OnInit {

  nameField = new FormControl("");
  emailField = new FormControl("");
  numberField = new FormControl("");
  phoneField = new FormControl("");
  colorField = new FormControl('#000000');
  dateField = new FormControl("");

  categoryField = new FormControl("category-3");
  tagField = new FormControl("");

  agreeField = new FormControl(false);

  ngOnInit(): void {
    this.nameField.valueChanges
    .subscribe(
      value => {
        console.log(value);
      }
    )
  }
  getNameValue(){
    console.log(this.nameField.value);

  }
}
