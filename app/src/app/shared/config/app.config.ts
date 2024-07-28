import { HttpBackend, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IAppConfig } from "./app-config.model";
import { firstValueFrom } from "rxjs";
import { AssetService } from "../services/asset.service";
import { environment } from "../../environments/environment";

@Injectable()
export class AppConfig {
  static settings: IAppConfig;

  constructor(private httpBackend: HttpBackend, private assetService: AssetService) { }

  load() {
    const jsonFile = `config/config.${environment.name}.json`;
    return new Promise<void>((resolve, reject) => {
      firstValueFrom(new HttpClient(this.httpBackend).get(this.assetService.getAssetUrl(jsonFile))).then((response: Object) => {
        AppConfig.settings = <IAppConfig>response;
        resolve();
      }).catch((response: any) => {
        reject(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
      });
    });
  }
}