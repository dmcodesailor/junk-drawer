import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  inject,
  async,
  TestBed,
  ComponentFixture
} from '@angular/core/testing';
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockConnection, MockBackend } from '@angular/http/testing';
import { ReflectiveInjector } from '@angular/core';
import { HttpModule } from "@angular/http";

import { ConfigurationConsulService }   from './configuration-consul.service';
import { ConfigurationSetting }         from '../models/configuration-setting';

describe (`ConfigurationConsulService`, () => {
    let providers = (<any>HttpModule).decorators[0].args[0].providers;
    let injector = ReflectiveInjector.resolveAndCreate(providers);
    let http = injector.get(Http);

    let svc: ConfigurationConsulService = null;
    let simpleTypeSetting: ConfigurationSetting = null;
    let complexTypeSetting: ConfigurationSetting = null;

    beforeEach(() => {
        svc = new ConfigurationConsulService(http);

        simpleTypeSetting = new ConfigurationSetting();
        simpleTypeSetting.Key = "logLevel";
        simpleTypeSetting.Value = "verbose";

        complexTypeSetting = new ConfigurationSetting();
        complexTypeSetting.Key = "appSettings";
        complexTypeSetting.Value = '{"requireAuth":true, "logLevel":5, "environment":"UAT"}';

    });

    /**
     * INTEGRATION TEST
     */
    it (`Consul KV - Write Simple Type - Expect Success`, () => {
        svc.put(simpleTypeSetting).toPromise().then((val) => {
            expect(val).toBe(true);
        });
    });

    it (`Consul KV - Write Simple Type - Expect Success`, () => {
        svc.putPrimitive(simpleTypeSetting.Key, simpleTypeSetting.Value).toPromise().then((val) => {
            expect(val).toBe(true);
        });
    });

    it ('Consul KV - Read Simple Type - Expect Success', () => {
        svc.getValue("cfgenabled").toPromise().then((val) => {
            expect((val as boolean)).toBe(true);
        });
    });
    
    it (`Consul KV - Write Complex Type - Expect Success`, async(() => {
        svc.putPrimitive(complexTypeSetting.Key, complexTypeSetting.Value).toPromise().then((val) => {
            expect(val).toBe(true);
        });        
    }));

    it ('Consul KV - Read Complex Type - Expect Success', () => {
        svc.getValueJson("appcfg").toPromise().then((val) => {
            var obj = JSON.parse(val);
            expect(obj.requireAuth).toBe(true);
            expect(obj.logLevel).toBe(5);
            expect(obj.environment).toBe("UAT");
        });
    });

    it ('Consul KV - Read Keys - Expect Multiple', () => {
        svc.getKeys().toPromise().then((val) => {
            expect(val.length).toBeGreaterThan(0);
        });        
    });
});