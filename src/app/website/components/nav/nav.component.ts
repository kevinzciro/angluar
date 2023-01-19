import { Component, OnInit} from '@angular/core';
import { StoreService } from "../../../services/store.service";
import { AuthService } from "../../../services/auth.service";
import { UsersService } from "../../../services/users.service";
import { CategoriesService } from "../../../services/categories.service";
import { TokenService } from "../../../services/token.service";
import { User } from 'src/app/models/user.model';
import { Category } from 'src/app/models/category.model';
import { Router } from "@angular/router";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit{

  profile: User | null = null;

  activeMenu = false;
  counter = 0;
  categories: Category[] = [];

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private usersService: UsersService,
    private tokenService: TokenService,
    private categoriesService: CategoriesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.storeService.myCartObs$.subscribe(products => {
      this.counter = products.length;
    });
    // if(localStorage.getItem("token")){
    //   this.authService.profile().subscribe( response => {
    //     this.profile = response;
    //   });
    // }
    this.getAllCategories();
    this.authService.userObs$
    .subscribe( data => {
      this.profile = data;
    })
  }

  toggleMenu(){
    this.activeMenu = !this.activeMenu;
  }

  createUser(){
    this.usersService.create({
      name: "Joaqui",
      email: "joaquin@mail.com",
      password: "12345",
      role: 'admin'
    })
    .subscribe( rta => {
      console.log(rta);
    })
  }

  login(){
    this.authService.loginAndGetProfile("maria@mail.com","12345")
    .subscribe( () => {
      this.router.navigate(['/profile']);
    });
  }

  getAllCategories(){
    this.categoriesService.getAll()
    .subscribe( data => {
      this.categories = data;
    })
  }

  logout(){
    this.authService.logout();
    this.profile = null;
    this.router.navigate(['/home']);
  }

}
