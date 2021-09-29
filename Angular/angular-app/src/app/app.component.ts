import { Component } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    public oidcSecurityService: OidcSecurityService,
    public http: HttpClient) { }

  ngOnInit() {
    this.oidcSecurityService
      .checkAuth()
      .subscribe((auth) => console.log('is authenticated', auth));
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  callApi() {

    debugger;

    const token = this.oidcSecurityService.getToken();

    this.http.get("https://localhost:44337/secret", {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
      responseType: 'text'
    })
      .subscribe((data: any) => {
        console.log("api result:", data);
      });
  }
}
