import { Component, OnInit } from '@angular/core';
import { AuthService } from "./../../../services/auth.service";
import { User } from "./../../../models/user.model";
import { TokenService } from "./../../../services/token.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  user: User | null = null;

  constructor(
    private authService: AuthService,
    private tokenService: TokenService
  ) {  }

  ngOnInit(): void {
    this.authService.userObs$
    .subscribe( data => {
      this.user = data;
    })
  }

}
