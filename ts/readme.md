# Typescript

## consul-wrapper

### Prerequisites

Consul is running and exposing its REST API.

### TL;DR

An integration test script for ensuring you can read/write from/to Consul Key-Value store via the API;

*** Warning! *** 

_This is not a unit test.  This is an_ integration test.  _As such, it is not the recommended behavior/pattern._

### D33tz

#### Motivation

This was created specifically for the purpose of demonstrating using Consul as a configuration settings store (via the Consule Key-Value API).  

The intent of unit testing is to inject a mock HTTP service into the Angular service.  For the purposes of investigating issues and verifying operation, I intentionally inject an _actual_ HTTP service.

This is _not_ recommended.

It turns out Consul doesn't support the "OPTIONS" header.  This, however, is required by, for example, Google Chrome, when invoking CORS pre-flight checks.  Thus, the reason I wrote this _integration test_ is to uncover the causes of failures in communicating with Consul's API from an Angular application.

#### Teh Codez
 
```javascript
ConfigurationConsulService
```
The actual service class responsible for interacting with the Consul API.  Nothing remarkable exists in this class.  It simply treats Consul's API as any other set of REST endpoints.  However, the URIs are assembled to specific behaviors and operations available through the Consul API.

```javascript
/* configuration-consul.service.spec.ts */

// Import the HttpModule and Angular's reflector.
import { ReflectiveInjector } from '@angular/core';
import { HttpModule } from "@angular/http";

// Reference the providers (services) exposed/exported from the HttpModule.
// Note:  The actual code requires a cast to type `any` but Markdown doesn't recognize the syntax.
//let providers = (<any>HttpModule).decorators[0].args[0].providers;
let providers = (HttpModule).decorators[0].args[0].providers;

// Using the Angular ReflectiveInjector (which ng uses for DI), resolve the HttpModule providers.
let injector = ReflectiveInjector.resolveAndCreate(providers);

// Obtain a reference to the HTTP service using the reflective injector.
let http = injector.get(Http);
```
The test specification using an _actual_ HTTP services instead of a mock HTTP service.