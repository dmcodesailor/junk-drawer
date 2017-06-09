import { Injectable }                   from '@angular/core';
import { Observable }                   from 'rxjs/Observable';
import { Http, Response }               from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { ConfigurationService }         from './configuration.service';
import { ConfigurationSetting }         from '../models/configuration-setting';

@Injectable()
export class ConfigurationConsulService extends ConfigurationService {
    private baseApiUrl:String = "http://localhost:8500/v1/";

    constructor(private consulHttp:Http) {
        super(consulHttp, "");
        // Assumes there is a trailing slash '/' on the URL.
        this.baseApiUrl += "kv/";
    }

    public getKeys():Observable<string> {
        return this.consulHttp.get(this.baseApiUrl + "?keys")
            .map(this.extractDataText)
            .catch(this.handleError);
    }

    public getValue(key:string):Observable<any> {
        return this.consulHttp.get(this.baseApiUrl + key + "?raw")
            .map(this.extractDataText)
            .catch(this.handleError);
    }

    public getValueJson(key:string):Observable<string> {
        return this.consulHttp.get(this.baseApiUrl + key + "?raw")
            .map(this.extractData)
            .catch(this.handleError);
    }

    public put(setting:ConfigurationSetting):Observable<boolean> {
        let headers:Headers = new Headers();
        headers.append('Content-Type', 'application/text');
        let val = (setting.Value as string);
        return this.consulHttp.put(this.baseApiUrl + setting.Key, val, headers)
            .map(this.extractBoolean)
            .catch(this.handleError);
    }

    public putPrimitive(key:string, val:any) {
        return this.consulHttp.put(this.baseApiUrl + key, val)
            .map(this.extractBoolean)
            .catch(this.handleError);        
    }

    protected extractDataText(res:Response) {
        let body = res.text();
        body = body.replace("[", "").replace("]", "");
        return body || "";
    }

    protected extractBoolean(res:Response) {
        let body:boolean =  (!!res.text);
        return body || false;
    }
}