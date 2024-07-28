import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable()
export class AssetService {
    public getAssetUrl(path: string): string{
        if(environment.production)
            return `/wp-content/plugins/alumni-dataverse-client/dist/browser/alumni-dataverse-client/${path}`;
        else
            return `assets/${path}`;
    }
}