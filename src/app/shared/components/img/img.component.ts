import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent
{

  img = '';

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('img')
  public set changeImg(newImg: string) {
    this.img = newImg;
    // console.log('chaange just image => ', this.img);
  }

  @Input() alt = ''

  imgDefault = '../../../../assets/images/default.png'
  @Output() loaded = new EventEmitter<string>();
  counter = 0;
  // counterFn: number | undefined;

  // constructor(){
  //   // before render
  //   // No async, run once
  //   console.log("Constructor",  "imgValue => ", this.img);
  // }

  // ngOnInit(): void {
  //   // before render
  //   // async like fecth, run once
  //   console.log("ngOnInit",  "imgValue => ", this.img);
  //   // this.counterFn = window.setInterval( () => {
  //   //   this.counter += 1;
  //   //   console.log('run counter');
  //   // }, 1000)
  // }

  // ngOnChanges(changes: SimpleChanges): void {
  //   // before and during render
  //   // Changes on inputs, it's listening continuously
  //   console.log("ngOnChange",  "imgValue => ", this.img);
  //   console.log('changes ', changes);

  // }

  // ngAfterViewInit(): void {
  //   // after render
  //   // handle childrens
  //   console.log("ngAfterViewInit");
  // }

  // ngOnDestroy(): void {
  //   // delete component
  //   console.log("ngOnDestroy");
  //   // window.clearInterval(this.counterFn);
  // }

  imgError(){
    this.img = this.imgDefault;
  }

  imgLoaded(){
    // console.log("Image loaded");
    this.loaded.emit(this.img);
  }
}
