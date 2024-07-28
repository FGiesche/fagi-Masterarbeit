import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppConfig } from "../config/app.config";
import { at_Event } from "../models/dataverse-gen";

@Injectable()
export class EventService {
    constructor(private http: HttpClient){
    }
    
    public get(id: string): Promise<at_Event | null>{
        return new Promise<at_Event | null>((resolve, reject) => {            
            this.http.get(`${AppConfig.settings.api.url}/Event`)
            .subscribe({
                next: (response: any) => {
                    let eventResponse = response.filter((e: { [x: string]: string; }) => e["at_EventId"] == id)[0];
                    let event: at_Event | null = null;
                    if(eventResponse != undefined)
                        event = {
                            at_name: eventResponse["at_Name"]
                        } as at_Event ;

                    resolve(event);
                },
                error: (error: any) => {
                    reject(error.error.error);
                }
            });
        });
    }
}