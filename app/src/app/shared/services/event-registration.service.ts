import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppConfig } from "../config/app.config";
import { error } from "console";
import { EntityReference } from "dataverse-ify";
import { at_Event, at_EventRegistration } from "../models/dataverse-gen";

@Injectable()
export class EventRegistrationService {
    constructor(private http: HttpClient){
    }

    public get(eventId: string): Promise<at_EventRegistration | null>{
      return new Promise<at_EventRegistration | null>((resolve, reject) => {            
        this.http.get(`${AppConfig.settings.api.url}/EventRegistration`)
        .subscribe({
          next: (response: any) => {
            let eventRegistrationResponse = response.filter((e: { [x: string]: { [x: string]: string; }; }) => e["at_Event"]["id"] == eventId)[0];
            let eventRegistration: at_EventRegistration | null = null;
            if(eventRegistrationResponse != undefined)
              eventRegistration = {
                id: eventRegistrationResponse["id"],
                createdon: eventRegistrationResponse["createdOn"],
              } as at_EventRegistration ;

            resolve(eventRegistration);             
          },
          error: (error: any) => {
            reject(error.error.error);
          }
        });
      });
  }
    
    public post(eventId: string): Promise<string>{
      return new Promise<string>((resolve, reject) => {
        this.http.post(`${AppConfig.settings.api.url}/EventRegistration?eventId=${eventId}`, {})
        .subscribe({
          next: (response: any) => {
            resolve(response as string);
          },
          error: (error: any) => {
            reject(error.error.error);
          }
        });
      });
    }

    public delete(eventRegistrationId: string): Promise<string>{
        return new Promise<string>((resolve, reject) => {
            this.http.delete(`${AppConfig.settings.api.url}/EventRegistration`, {
              body: {
                "Id": eventRegistrationId
              }
            })
            .subscribe({
                next: (response: any) => {
                    resolve(response as string);
                },
                error: (error: any) => {
                    reject(error.error.error);
                }
            });
        });
    }
}