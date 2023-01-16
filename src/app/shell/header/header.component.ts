import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService, CredentialsService } from '@app/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  menuHidden = false;
  menuHiddenContact = false;
  settingsMenuHidden = false;
  campaignMenuHidden = false;
  marketingMenuHidden = false;
  postMenuHidden = false;
  appointmentMenuHidden = false;
  marketingMenusHidden = false

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService
  ) {}

  ngOnInit() {}

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }
  toggleEmailTextMenu(){
    this.marketingMenusHidden =!this.marketingMenusHidden;
  }

  toggleMenuContact() {
    this.menuHiddenContact = !this.menuHiddenContact;
  }

  toggleSettingsMenu() {
    this.settingsMenuHidden = !this.settingsMenuHidden;
  }
  toggleCampaignMenu(){
    this.campaignMenuHidden =!this.campaignMenuHidden;
  }
  toggleMarketingMenu(){
    this.marketingMenuHidden =!this.marketingMenuHidden;
  }
  togglePostMenu(){
    this.postMenuHidden =!this.postMenuHidden;
  }
  toggleAppointmentMenu(){
    this.appointmentMenuHidden = !this.appointmentMenuHidden
  }

  logout() {
    this.authenticationService.logout().subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  get username(): string | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.email : null;
  }
}
