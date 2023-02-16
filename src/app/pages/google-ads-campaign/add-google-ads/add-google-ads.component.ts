import { Component,NgZone, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FacebookLoginProvider, SocialAuthService,  SocialUser, } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { GoogleAdsService } from '../google-ads.service';
import { DatePipe } from '@angular/common';
import { MarketingService } from '@app/pages/marketing/marketing.service';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-google-ads',
  templateUrl: './add-google-ads.component.html',
  styleUrls: ['./add-google-ads.component.scss']
})
export class AddGoogleAdsComponent implements OnInit {
  newCampaignForm!:FormGroup;
  typeText:any = [];
  isLoggedin?: boolean = undefined;
  refreshToken: string;
  facebookAuthToken: string;
  socialUser!: SocialUser;
  listInstaPage: any =[];
  myDate = new Date();
  newDate :any;
  campaignTypes:any = [];
  showCampaignList: boolean = false;
  showSelectedCampaign: any;
  isSelected: boolean = false;
  selectedCampaign: String;
  appDownOption:boolean = false;
  showModalCampaign:boolean= false;

 
  

  constructor(
    public toastr: ToastrService,
    private ngZone: NgZone,
    private router: Router,
    private googleadsservice:GoogleAdsService ,
    private datePipe: DatePipe ,
    private socialAuthService: SocialAuthService,
    private marketingService: MarketingService, 
    private formBulider: FormBuilder,
    // private modalService: NgbModal
  ) { 
    console.log(this.isLoggedin);
  }

  ngOnInit(): void {
   const dates = this.myDate
   console.log('new date',dates);
   this.newDate  = this.datePipe.transform(dates,'dd-MM-yyyy')
   console.log('this.newDate',this.newDate);
   
    this.newCampaignForm = this.formBulider.group({
      name:[null,[Validators.required]],
      advertising_channel_type: [null,[Validators.required]],
      creatingFor: [null, [Validators.required]],
      campaign_budget: [null, [Validators.required]],
    });

    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
    });
    this.socialAuthService.authState.subscribe((user) => {
      this.facebookAuthToken = user.authToken;
      localStorage.setItem('fbAccessToken', this.facebookAuthToken) 
    })

    this.campaignTypes = [
      {
        id:1,
        heading:"Search",
        description:"Get in front of high-intent customers at the right time on Google Search",
        img:""
      },
      {
        id:2,
        heading:"Performance Max",
        description:"Reach audiences across all of Google with a single campaign.See how it works",
        img:""
      },
      {
        id:3,
        heading:"Display",
        description:"Reach customers across three million sites and apps with engaging creative",
        img:""
      },
      {
        id:4,
        heading:"Shopping",
        description:"Showcase your products to shoppers as they explore what to buy",
        img:""
      },
      {
        id:5,
        heading:"Video",
        description:"Reach viewers on YouTube and get conversions",
        img:""
      },
      {
        id:6,
        heading:"Discovery",
        description:"Run ads on YouTube, Gmail, Discover and more",
        img:""
      }
    ]
  
  }

  loginWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.instaPage();
  }

  instaPage() {
    this.marketingService.instaPage().subscribe((data) => {
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
 


  // onSubmit(){
  //   console.log(this.newCampaignForm.value)
  // }
  

  selectCampaign(id: any, heading: any){
    this.isSelected = !this.isSelected;
    this.showSelectedCampaign = id;
    this.selectedCampaign = heading;
  }

  appDownload(event){
    console.log(event.target.checked)
    this.appDownOption = event.target.checked;
  }

  openModal(idElm: any) {
    // var element: HTMLElement = document.getElementById(idElm) as HTMLElement;
    // element.click();
    // const modalRef = this.modalService.open('campaignDetails', {
    //   size: 'xl',
    //   centered: true,
    //   windowClass: 'dark-modal'
    // });
  }

  continue(){
    this.showCampaignList = true;

    if(this.selectedCampaign){
      this.showModalCampaign = true;
      
    }
  }

  startNew(){
    this.ngZone.run(() => this.router.navigateByUrl(`ad-search`));
  }
  
  get f() {
    return this.newCampaignForm.controls;
  }

}
