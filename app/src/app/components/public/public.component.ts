import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { UserService } from "../../shared/services/user.service";
import { DxButtonModule } from 'devextreme-angular';

@Component({
  selector: "app-public",
  standalone: true,
  imports: [DxButtonModule],
  templateUrl: "./public.component.html",
  styleUrls: ["./public.component.css"],
})
export class PublicComponent implements OnInit{
  public isLoggedIn: boolean = false;

  constructor(private http: HttpClient, private userService: UserService) {

  }

  public ngOnInit(): void {
    this.userService.stateChanged$.subscribe(() => {
      this.isLoggedIn = this.userService.isLogggedIn;
    });
    this.isLoggedIn = this.userService.isLogggedIn;
  }

  public onClickLogout(e: any): any {
    this.userService.logout();
  }

  public onClickLogin(e: any): void{
    this.userService.login();
  }
}