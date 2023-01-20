import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent implements OnInit {

  constructor(
    private formBuilder:FormBuilder
  ) {
    this.form = this.formBuilder.group({
      name: ["", [Validators.required, Validators.maxLength(15), Validators.pattern(/^([Aa-zA-ZáéíóúÁÉÍÓÚÑñ]{2,}\s?){2,4}$/)]],
      email: ["", [Validators.required, Validators.email]],
      number: ["", [Validators.required, Validators.min(18), Validators.max(99)]],
      phone: ["", Validators.required],
      color: ["#00000"],
      date: [""],
      category: ["ctegory-3"],
      tag: [""],
      agree: [false, [Validators.requiredTrue]],
      gender: [""],
      zone: [""],
    });
  }

  private form: FormGroup;

  // nameField = new FormControl("", [Validators.required, Validators.maxLength(15)]);
  // emailField = new FormControl("");
  // numberField = new FormControl("");
  // phoneField = new FormControl("");
  // colorField = new FormControl('#000000');
  // dateField = new FormControl("");

  // categoryField = new FormControl("category-3");
  // tagField = new FormControl("");

  // agreeField = new FormControl(false);
  // genderField = new FormControl("");
  // zoneField = new FormControl("");

  ngOnInit(): void {
    this.nameField?.valueChanges
    .subscribe(
      value => {
        console.log(value);
    });

    this.form.valueChanges
      .subscribe(
        value => {
          console.log(value);
    });

  }

    getNameValue(){
      console.log(this.nameField?.value);
    }

    get isNameFieldValid(){
      return this.nameField?.touched && this.nameField?.valid;
    }

    get isNameFieldInvalid(){
      return this.nameField?.touched && this.nameField?.invalid;
    }

  get nameField(){
    return this.form.get('name');
  }
  get emailField(){
    return this.form.get('email');
  }
  get numberField(){
    return this.form.get('number');
  }
  get phoneField(){
    return this.form.get('phone');
  }
  get colorField(){
    return this.form.get('color');
  }
  get dateField(){
    return this.form.get('date');
  }
  get categoryField(){
    return this.form.get('category');
  }
  get tagField(){
    return this.form.get('tag');
  }
  get agreeField(){
    return this.form.get('agree');
  }
  get genderField(){
    return this.form.get('gender');
  }
  get zoneField(){
    return this.form.get('zone');
  }

  get getForm(){
    return this.form;
  }

  save(){
    if (this.form.valid) {
      console.log(this.form.value);
    }
    else{
      this.form.markAllAsTouched();
    }
  }

}
