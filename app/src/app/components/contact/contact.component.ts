import { Component, OnInit } from "@angular/core";
import { MsalService } from "@azure/msal-angular";
import { ContactService } from "../../shared/services/contact.service";
import { Contact } from "../../shared/models/dataverse-gen";
import { LayoutParameter, LayoutService, NotificationType } from "../../shared/services/layout.service";
import { DxButtonModule, DxFormModule } from "devextreme-angular";

@Component({
  selector: "app-contact",
  standalone: true,
  imports: [DxButtonModule, DxFormModule],
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"],
})
export class ContactComponent implements OnInit{
  public contact: Contact = {} as Contact;

  constructor(private contactService: ContactService, private layoutService: LayoutService, private msalService: MsalService){
  }

  public ngOnInit(): void {
    this.layoutService.change(LayoutParameter.ShowLoading, true);
    this.contactService.get().then((c) => {
      this.contact = c;
    })
    .finally(() => {
      this.layoutService.change(LayoutParameter.ShowLoading, false);
    });;
  }

  public onClickSaveContact(e: any) {
    this.layoutService.change(LayoutParameter.ShowLoading, true);
    this.contactService.patch(this.contact).then((c) => {
      this.layoutService.notify({type: NotificationType.Success, message: "Erfolgreich gespeichert!"})
    })
    .catch((error) => {
      this.layoutService.notify({type: NotificationType.Error, message: `Fehler: ${error.message}`})
    })
    .finally(() => {
      this.layoutService.change(LayoutParameter.ShowLoading, false);
    });
  }

  public onClickLogout(e: any): any {
    this.msalService.logoutRedirect();
  }
}