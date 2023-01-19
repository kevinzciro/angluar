import { Component, OnInit } from '@angular/core';
import { FilesService } from "./services/files.service";
import { AuthService } from "./services/auth.service";
import { TokenService } from "./services/token.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private filesService: FilesService,
    private tokenService: TokenService,
    private authService: AuthService,
  ){}

  ngOnInit(): void {
    const token = this.tokenService.getToken();
    if (token){
      this.authService.profile().subscribe(data => console.log(data))
    }
  }


  // public name: string = 'Kevin';
  // age = 25;
  // img = 'https://empresas.blogthinkbig.com/wp-content/uploads/2019/11/Imagen3-245003649.jpg?w=800';
  // btnDisabled = true;

  imgParent = '';
  showImg = false;
  imgRta = '';



  // register = {
  //   name: '',
  //   email: '',
  //   password: ''
  // }

  // widthIm = 10;

  // person = {
  //   name: 'Kevin',
  //   age: 25,
  //   avatar: 'https://empresas.blogthinkbig.com/wp-content/uploads/2019/11/Imagen3-245003649.jpg?w=800',
  // }

  // names: string[] = ['Kevin', 'Nocilas', 'Santi', 'Juli'];
  // newName = "";
  // box = {
  //   width: 100,
  //   height: 100,
  //   background: "red",
  // }

  // public toggleButton(){
  //   this.btnDisabled = !this.btnDisabled;
  // }

  // public increaseAge(){
  //   this.person.age += 1;
  // }

  // public onScroll(event: Event){
  //   const element = event.target as HTMLElement;
  //   console.log(element.scrollTop);
  // }

  // public changeName(event:Event){
  //   const element = event.target as HTMLInputElement;
  //   this.person.name = element.value;
  // }

  // public addName(){
  //   this.names.push(this.newName);
  //   this.newName = "";
  // }

  // public deleteName(index: number){
  //   this.names.splice(index, 1);
  // }

  // public onRegister(){
  //   console.log(this.register);

  // }


  onLoaded(img: string){
    console.log("Image loaded parent", img);
  }

  toggleImg(){
    this.showImg = !this.showImg;
  }

  downloadPdf(){
    this.filesService.getFile("my.pdf", 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf')
    .subscribe()
  }

  onUpload(event: Event){
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.filesService.uploadFile(file)
      .subscribe( rta => {
        this.imgRta = rta.location;
      });
    }

  }
}
