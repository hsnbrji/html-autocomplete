# HTML Autocomplete

A very light weight html/javascript autocomplete component.
This component was built using [StencilJs](https://stenciljs.com/).

## Support
This component works in pure HTML pages regardless of the framework
you are using.

## Basic Usage
###HTML
Import the javascript file the head tag of the page.
```html
<head>
  <script src='https://unpkg.com/html-autocomplete@[version]/dist/html-autocomplete.js'></script>
  ...
</head>
```
Add the autocomplete tag
```html
<!--where suggestions is the list of your objects-->
<html-autocomplate mode="material" suggestions="suggestions" (itemSelected)="fuction($event)">
</html-autocomplate>
```
###NPM
#### Installation
```BASH
npm i html-autocomplete --save
```
####Angular/Ionic Only

```TYPESCRIPT
@NgModule({
  declarations: [
  ...
  ],
  imports: [
    ...
  ],
  providers: [
    ...
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Add this line
  bootstrap: [AppComponent]
})
```
####Import component
In you main file, add the following lines
```typescript
import { defineCustomElements } from 'html-autocomplete/loader';
...

defineCustomElements(window);
```
Add the autocomplete tag
```html
<!--where suggestions is the list of your objects-->
<html-autocomplate mode="material" suggestions="suggestions" (itemSelected)="fuction($event)">
</html-autocomplate>
```

### Reactive Forms
```HTML
<ion-autocomplete [suggestions]="suggestions"
                  (itemSelected)="customerSelected($event)"
                  formControlName="customerId">
</ion-autocomplete>
```

```TYPESCRIPT
import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  customers: any[];
  selectedCustomer: any;
  formGroup: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
    customerId: []
    ...
    });
   }
  
  customerSelected(customer) {
    this.selectedCustomer = customer;
  }
  
}
```

### Input Properties

| Name          | Type          | Default   | Description             |
| --------------|:-------------:| ---------:|------------------------:|
| suggestions   | any[]         | null      |List to search           |
| labelField    | string        | 'name'    |Label property           |
| idField       | string        | 'id'      |Id property              |
| placeholder   | string        | 'Search'  |Placeholder              |
| value   | string         | ''        |Original value  of input |
| readonly      | boolean       | false     |Disable component        |


## Output Properties

| Name          | Type          | Description             |
| --------------|:-------------:|------------------------:|
| itemSelected  | EventEmitter  |Item Selected            |

## Css Variables

| Name                   | value         | Description             |
| --------------         |:-------------:|------------------------:|
| --width                | 100%          |Width of the input       |
| --color                | #000000       |Color inside input       |
| --label-color          | #000000       |Label Color (material)    |
| --label-color-focus    | #2196f3       |Label Color when focus (material)      |
| --border-color         | #c6c6c6       |Color of border (material)       |
| --border-color-focus   | #2196f3       |Color of border on focus (material)       |
| --font-size            | 18px          |Font size       |
| --label-font-size      | 16px          |Label font size (material)       |
| --label-font-size-focus| 12px          |label font size focus(material)       |
| --margin-top           | 16px          |Top margin       |
| --margin-bottom        | 16px          |Bottom margin       |
| --margin-left          | 16px          |Left margin       |
| --margin-right         | 16px          |Right margin      |


## Thanks for reading
