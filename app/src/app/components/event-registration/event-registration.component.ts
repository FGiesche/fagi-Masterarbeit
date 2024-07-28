import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MsalService } from "@azure/msal-angular";
import { at_Event, at_EventRegistration, Contact } from "../../shared/models/dataverse-gen";
import { LayoutParameter, LayoutService, NotificationType } from "../../shared/services/layout.service";
import { UserService } from "../../shared/services/user.service";
import { ContactService } from "../../shared/services/contact.service";
import { EventService } from "../../shared/services/event.service";
import { EventRegistrationService } from "../../shared/services/event-registration.service";
import { DxButtonModule, DxFormModule } from "devextreme-angular";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-event-registration",
  standalone: true,
  imports: [DxButtonModule, DxFormModule, DatePipe],
  templateUrl: "./event-registration.component.html",
  styleUrls: ["./event-registration.component.css"],
})
export class EventRegistrationComponent implements OnInit{
  public eventId: string | null | undefined = "";
  public eventRegistration: at_EventRegistration | null = null;
  public event: at_Event | null = null;
  public isLoggedIn: boolean = false;
  public contact: Contact = {} as Contact;

  constructor(private activatedRoute: ActivatedRoute, private eventService: EventService, private layoutService: LayoutService, private eventRegistrationService: EventRegistrationService, private msalService: MsalService, private userService: UserService, private contactService: ContactService){
    this.eventId = this.activatedRoute.snapshot.paramMap.get('id')?.toLowerCase();
    this.isLoggedIn = this.msalService.instance.getAllAccounts().length > 0
  }

  public ngOnInit(): void {
    this.userService.stateChanged$.subscribe(() => {
      this.isLoggedIn = this.userService.isLogggedIn;
    });
    this.isLoggedIn = this.userService.isLogggedIn;

    if(this.isLoggedIn)
      this.loadData();
  }

  public onClickSignUp(e: any): void{
    this.layoutService.change(LayoutParameter.ShowLoading, true);
    this.eventRegistrationService.post(this.eventId as string).then(() => {
      this.loadData();
      this.layoutService.notify({type: NotificationType.Success, message: "Erfolgreich angemeldet!"})
    })
    .catch((error: { message: any; }) => {
      this.layoutService.notify({type: NotificationType.Error, message: `Fehler: ${error.message}`})
    })
    .finally(() => {
      this.layoutService.change(LayoutParameter.ShowLoading, false);
    });
  }

  public onClickSignOff(e: any): void{
    this.layoutService.change(LayoutParameter.ShowLoading, true);
    this.eventRegistrationService.delete(this.eventRegistration?.id as string).then(() => {
      this.loadData();
      this.layoutService.notify({type: NotificationType.Success, message: "Erfolgreich abgemeldet!"})
    })
    .catch((error: { message: any; }) => {
      this.layoutService.notify({type: NotificationType.Error, message: `Fehler: ${error.message}`})
    })
    .finally(() => {
      this.layoutService.change(LayoutParameter.ShowLoading, false);
    });
  }

  private loadData(): void{
    this.layoutService.change(LayoutParameter.ShowLoading, true);
    this.eventService.get(this.eventId as string).then((e) => {
      this.event = e;
      this.eventRegistrationService.get(this.eventId as string).then((er: at_EventRegistration | null) => {
        this.eventRegistration = er;
        this.contactService.get().then((c) => {
          this.contact = c;
        })
        .catch((error) => {
          this.layoutService.notify({type: NotificationType.Error, message: `Fehler: ${error.message}`})
        })
        .finally(() => {
          this.layoutService.change(LayoutParameter.ShowLoading, false);
        });
      })
      .catch((error: { message: any; }) => {
        this.layoutService.notify({type: NotificationType.Error, message: `Fehler: ${error.message}`})
      })
    })
    .catch((error: { message: any; }) => {
        this.layoutService.notify({type: NotificationType.Error, message: `Fehler: ${error.message}`})
    });
  }
}