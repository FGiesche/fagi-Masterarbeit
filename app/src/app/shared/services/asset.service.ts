import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable()
export class AssetService {
    public getAssetUrl(path: string): string{
        if(environment.production)
            return `/wp-content/plugins/alumni-dataverse-client-1/dist/alumni-dataverse-client/browser/assets/${path}`;
        else
            return `assets/${path}`;
    }
}