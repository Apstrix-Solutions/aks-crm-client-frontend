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
  settingsMenuHidden = false;
  campaignMenuHidden = false;
  marketingMenuHidden = false;
  postMenuHidden = false;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService
  ) {}

  ngOnInit() {}

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
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
  logout() {
    this.authenticationService.logout().subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  get username(): string | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.email : null;
  }
}
