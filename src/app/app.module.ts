import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { environment } from '@env/environment';
import {
  RouteReusableStrategy,
  ApiPrefixInterceptor,
  ErrorHandlerInterceptor,
  SharedModule,
} from '@shared';
import { AuthModule } from '@app/auth';
import { HomeModule } from './home/home.module';
import { ShellModule } from './shell/shell.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UserProfileModule } from './pages/settings/user-profile/user-profile.module';
import { AccountSettingsModule } from './pages/settings/account-settings/account-settings.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from './@shared/http/api.service';
import { AuthService } from './auth.service';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { ListLeadsModule } from './pages/leads/list-leads/list-leads.module';
import { AddLeadsModule } from './pages/leads/add-leads/add-leads.module';
import {DashbordModule } from './pages/marketing/dashbord/dashbord.module';
import { OrganicpostModule } from './pages/marketing/organicpost/organicpost.module';
import { CalenderModule } from './pages/marketing/calender/calender.module';
import { CreateContentsModule } from './pages/marketing/campaigns/create-contents/create-contents.module';
import { AddCampaignModule } from './pages/marketing/campaigns/add-campaign/add-campaign.module';
import { ViewPostModule } from './pages/marketing/organicpost/view-post/view-post.module';
import { AddContactModule } from './pages/contact/add-contact/add-contact.module';
import { ListContactModule } from './pages/contact/list-contact/list-contact.module'; 
import { FacebookLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { ViewLeadsModule } from './pages/leads/view-leads/view-leads.module';
import { ImportLeadsModule } from './pages/leads/import-leads/import-leads.module';
import { ListPostModule } from './pages/marketing/organicpost/list-post/list-post.module';
import { ListCampainsModule } from './pages/marketing/campaigns/list-campains/list-campains.module';
import { LandingModule } from './pages/marketing/organicpost/lanading-page/landing-page.module';
import { LandingPageModule } from './pages/marketing/campaigns/landing-page/landing-page.module';
import { ListCustomerModule } from './pages/customer/list-customer/list-customer.module';
import { AddAppointmentModule } from './pages/appointments/add-appointment/add-appointment.module';
import { ListAppointmentModule } from './pages/appointments/list-appointment/list-appointment.module';
import { AppoinmentLeadsModule } from './pages/leads/appoinment-leads/appoinment-leads.module';
import { AddEmailModule } from './pages/marketing/email/add-email/add-email.module';
import { ListEmailModule } from './pages/marketing/email/list-email/list-email.module';
import {AddTextModule} from './pages/marketing/text/add-text/add-text.module';
import {ListTextModule} from './pages/marketing/text/list-text/list-text.module';
import { AddWorkflowModule } from './pages/workflow/add-workflow/add-workflow.module';
import { ListWorkflowModule } from './pages/workflow/list-workflow/list-workflow.module';
import { SubmitContactModule } from './pages/marketing/campaigns/submit-contact/submit-contact.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AddCustomerModule } from './pages/customer/add-customer/add-customer.module';
import { AddGoogleAdsModule } from './pages/google-ads-campaign/add-google-ads/add-google-ads.module';
import { ListGoogleAdsModule } from './pages/google-ads-campaign/list-google-ads/list-google-ads.module';
import { AdSearchModule } from './pages/google-ads-campaign/ad-search/ad-search.module';
import { AdsKeywordsModule } from './pages/google-ads-campaign/ads-keywords/ads-keywords.module';

// <============

@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('./ngsw-worker.js', {
      enabled: environment.production,
    }),
    FormsModule,
    HttpClientModule,
    RouterModule,
    TranslateModule.forRoot(),
    NgbModule,
    SharedModule,
    ShellModule,
    HomeModule,
    AuthModule,
    AccountSettingsModule,
    UserProfileModule,
    ReactiveFormsModule,
    ListLeadsModule,
    AddLeadsModule,
    AddCampaignModule,
    CreateContentsModule,
    DashbordModule,
    OrganicpostModule,
    ViewPostModule,
    CalenderModule,
    AddContactModule,
    ListContactModule,
    SocialLoginModule,
    ViewLeadsModule,
    ImportLeadsModule,
    ListPostModule,
    ListCampainsModule,
    LandingModule,
    LandingPageModule,
    AppoinmentLeadsModule,
    ListCustomerModule,
    AddAppointmentModule,
    ListAppointmentModule,
    SubmitContactModule,
    AddEmailModule,
    ListEmailModule,
    AddTextModule,
    ListTextModule,
    FullCalendarModule,
    AddCustomerModule,
    AddWorkflowModule,
    ListWorkflowModule,
    AddGoogleAdsModule,
    ListGoogleAdsModule,
    AdSearchModule,
    AdsKeywordsModule,
    NgHttpLoaderModule.forRoot(), // <============ Don't forget to call 'forRoot()'!
    AppRoutingModule, // must be imported as the last module as it contains the fallback route
  ],
  declarations: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
    {
      provide: RouteReuseStrategy,
      useClass: RouteReusableStrategy,
    },
    ApiService,
    AuthService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('1473922069701469'),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
