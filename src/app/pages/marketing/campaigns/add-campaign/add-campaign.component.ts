import { Component,NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FacebookLoginProvider, SocialAuthService,  SocialUser, } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { MarketingService } from '../../marketing.service';
import { AddCampaignService } from './add-campaign.service';
@Component({
  selector: 'app-add-campaign',
  templateUrl: './add-campaign.component.html',
  styleUrls: ['./add-campaign.component.scss']
})
export class AddCampaignComponent implements OnInit {
  newCampaignForm!:FormGroup;
  typeText:any = [];
  isLoggedin?: boolean = undefined;
  refreshToken: string;
  facebookAuthToken: string;
  socialUser!: SocialUser;
  listInstaPage: any =[];

  constructor(
    private formBulider: FormBuilder,
    public toastr: ToastrService,
    private ngZone: NgZone,
    private router: Router,
    private marketingService: MarketingService,
    private addCampaignService: AddCampaignService,
    private socialAuthService: SocialAuthService,
  ) { }

  ngOnInit(): void {
    this.newCampaignForm = this.formBulider.group({
      name: [null, [Validators.required]],
      status: [null, [Validators.required]],
      objective:[null,[Validators.required]],
      category:[null,[Validators.required]],
      acc_id:[null]
    });

    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
    });
    this.socialAuthService.authState.subscribe((user) => {
      this.facebookAuthToken = user.authToken;
      localStorage.setItem('fbAccessToken', this.facebookAuthToken) 
    })
  }


  addCampaign(){
    this.addCampaignService.addCampaign(this.newCampaignForm.value).subscribe((res) => {
      console.log(res)
    })
  }

  listCampaign(){
    this.addCampaignService.getCampaign().subscribe((res) => {
      console.log(res)
    })
  }

  onSubmit(){
    console.log(this.newCampaignForm.value)
  }

  loginWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.instaPage();
  }

  signOut(): void {
    this.socialAuthService.signOut();
  }

  instaPage() {
    this.marketingService.instaPage().subscribe((data) => {
      console.log('data-----',data)
      this.refreshToken = data.headers.get('refresh_token');
      this.listInstaPage = this.formatListPage( data['body']['data']['data']);
    });
  }

  formatListPage(data){
    for(let i =0; i<data.length;i++){
      data[i].index = i;
    }
    return data;
  }


  get f() {
    return this.newCampaignForm.controls;
  }


}
