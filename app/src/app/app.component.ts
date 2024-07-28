import { Component, ElementRef, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { DxLoadPanelModule } from 'devextreme-angular';
import { LayoutService } from './shared/services/layout.service';
import { UserService } from './shared/services/user.service';
import notify from "devextreme/ui/notify";
import { PublicComponent } from "./components/public/public.component";
import { MsalService } from '@azure/msal-angular';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DxLoadPanelModule, PublicComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public showLoading: boolean = false;
  public loadingMessage: string = "";
  public isLoggedIn: boolean = false;

  constructor(private router: Router, private layoutService: LayoutService, private elementRef: ElementRef, private userService: UserService, private authService: MsalService) {
    let initRoute = this.elementRef.nativeElement.getAttribute("initRoute");
    if(initRoute != undefined && initRoute != ""){
      this.router.navigate([initRoute], {skipLocationChange: true});
    }

    //get layout values from layout service
    this.layoutService.showLoading$.subscribe(
      (show) => (this.showLoading = show)
    );
    this.layoutService.loadingMessage$.subscribe(
      (message) => (this.loadingMessage = message)
    );

    //get notifications
    this.layoutService.notifications$.subscribe((notification) =>
      notification.message !== undefined
        ? notify(
            notification.message,
            notification.type,
            notification.displayTime
          )
        : notify(
            notification.options,
            notification.type,
            notification.displayTime
          )
    );
    authService.initialize().subscribe(() => { authService.handleRedirectObservable().subscribe(() => { this.isLoggedIn = this.userService.isLogggedIn }) });
  }

  public ngOnInit(): void {
    this.userService.stateChanged$.subscribe(() => {
      this.isLoggedIn = this.userService.isLogggedIn;
    });
    this.isLoggedIn = this.userService.isLogggedIn;
  }

  
  public onClickLogin(e: any): void{
    this.userService.login();
  }

}