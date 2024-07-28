import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppConfig } from "../config/app.config";
import { Contact } from "../models/dataverse-gen";

@Injectable()
export class ContactService {
    constructor(private http: HttpClient){
    }
    
    public get(): Promise<Contact>{
        return new Promise<Contact>((resolve, reject) => {
            this.http.get(`${AppConfig.settings.api.url}/Contact`)
            .subscribe({
                next: (response: any) => {
                    resolve({
                        lastname: response["lastName"],
                        firstname: response["firstName"],
                        birthdate: response["birthDate"],
                        telephone1: response["telephone1"],
                        mobilephone: response["mobilePhone"],
                        emailaddress1: response["eMailAddress1"],
                        address1_line1: response["address1_Line1"],
                        address1_postalcode: response["address1_PostalCode"],
                        address1_city: response["address1_City"],
                        address1_country: response["address1_Country"],
                    } as Contact);
                },
                error: (error: any) => {
                    reject(error.error.error);
                }
            });
        });
    }

    public patch(changes: Contact): Promise<string>{
        return new Promise<string>((resolve, reject) => {
            let changedForApi = {
                "lastName": changes.lastname,
                "firstName": changes.firstname,
                "birthDate": changes.birthdate,
                "telephone1": changes.telephone1,
                "mobilePhone": changes.mobilephone,
                "eMailAddress1": changes.emailaddress1,
                "address1_Line1": changes.address1_line1,
                "address1_PostalCode": changes.address1_postalcode,
                "address1_City": changes.address1_city,
                "address1_Country": changes.address1_country,
            };
            this.http.patch(`${AppConfig.settings.api.url}/Contact`, changedForApi)
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