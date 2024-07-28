import { Injectable } from "@angular/core";
import { MsalBroadcastService, MsalService } from "@azure/msal-angular";
import { Observable, Subject, filter, map, merge, switchMap, takeUntil } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { EventMessage, EventType, InteractionStatus } from "@azure/msal-browser";
import { LogService } from "./log.service";
import { LayoutService } from "./layout.service";
import { InitRedirctRequest } from "../config/msal-config";

@Injectable()
export class UserService {
  public isLogggedIn: boolean = false;
  //observables
  private readonly _destroying$ = new Subject<void>();
  private manualUpdate = new Subject<void>();
  public stateChanged$: Observable<void>;

  constructor(
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private logService: LogService,
    private http: HttpClient,
    private layoutService: LayoutService
  ) {
    this.msalBroadcastService.inProgress$
      .pipe(
        filter(
          (status: InteractionStatus) => status === InteractionStatus.None
        ),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.updateUserInformation()
      });

    let login$ = this.msalBroadcastService.msalSubject$.pipe(
      filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
      takeUntil(this._destroying$)
    );

    let logout$ = this.msalBroadcastService.msalSubject$.pipe(
      filter((msg: EventMessage) => msg.eventType === EventType.LOGOUT_SUCCESS),
      takeUntil(this._destroying$),
    );

    this.stateChanged$ = merge(
      login$,
      logout$,
      this.manualUpdate.asObservable()
    ).pipe(
      map(() => {
        this.updateUserInformation()
        this.logService.debug("user state may have changed");
      })
    );

    this.updateUserInformation()
  }

  public login(): Observable<void> {
    return this.authService.loginRedirect(InitRedirctRequest).pipe(
      map((result) => {
        this.logService.debug(result);
      })
    );
  }

  public async logout(): Promise<void> {
    await this.authService.logoutRedirect();
  }

  private updateUserInformation(): void {
    this.isLogggedIn = this.isMSALLoggedIn();
  }

  private isMSALLoggedIn(): boolean {
    return this.authService.instance.getAllAccounts().length > 0;
  }
}