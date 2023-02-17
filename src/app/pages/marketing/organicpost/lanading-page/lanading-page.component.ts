import { Component, OnInit } from '@angular/core';
import { FacebookLoginProvider, SocialAuthService,  SocialUser, } from 'angularx-social-login';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MarketingService } from '../../marketing.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-lanading-page',
  templateUrl: './lanading-page.component.html',
  styleUrls: ['./lanading-page.component.scss']
})
export class LanadingPageComponent implements OnInit {
  newSmActivityForm!: FormGroup;
  loginForm!: FormGroup;
  socialUser!: SocialUser;
  isLoggedin?: boolean = undefined;
  refreshToken: string;
  facebookAuthToken: string;
  listPage:  any = [];
  listInstaPage: any =[];
  ownershipInfo:string = '';
  smInfo: any = [];



  constructor(  private formBulider: FormBuilder,
    private socialAuthService: SocialAuthService,
    private marketingService: MarketingService,
    public toastr: ToastrService,
    ) { }

  ngOnInit(): void {
    this.loginForm = this.formBulider.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
    });
    this.socialAuthService.authState.subscribe((user) => {
     // console.log(user);
      this.facebookAuthToken = user.authToken;
      localStorage.setItem('fbAccessToken', this.facebookAuthToken)
      //console.log(this.facebookAuthToken);
    })
    this.newSmActivityForm = this.formBulider.group({
      ownership:[null,[Validators.required]],
      activity_records:[null],
    });
  }
  loginWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.instaPage();
  }
  onSelected(value:string): void {
    this.ownershipInfo = value;
    if (value == 'agency'){
      this.ownedPage();
      this.newSmActivityForm.controls['ownership'].setValue(true);
    }
    else if(value == 'client'){
      this.clientPage();
      this.newSmActivityForm.controls['ownership'].setValue(false);
    }
	}
  ownedPage() {
    this.marketingService.ownedPage().subscribe((data) => {
    this.refreshToken = data.headers.get('refresh_token');
    this.listPage = this.formatListPage( data['body']['data']['data']);
   // console.log('listPage in ownedPage() -> ',this.listPage)
    });
  };
  clientPage() {
    this.marketingService.clientPage().subscribe((data) => {
      this.refreshToken = data.headers.get('refresh_token');
      this.listPage = this.formatListPage( data['body']['data']['data']);
    });
  };
  instaPage() {
    this.marketingService.instaPage().subscribe((data) => {
      if(data['body']['error']){
        const msg = data['body']['message'];
       // this.toastr.error(msg);
        // console.log(msg)
      }else{
        this.refreshToken = data.headers.get('refresh_token');
        this.listInstaPage = this.formatListPage( data['body']['data']['data']);
      }
      
    });
  };
  formatListPage(data){
    for(let i =0; i<data.length;i++){
      data[i].index = i;
    }
    return data;
    }
    // setActivity() {
    //   console.log('set');
    //        console.log('newSmActivityForm',this.newSmActivityForm.value)

    //  }
    goToSet() {
      if (this.newSmActivityForm.invalid) {
            return;
          }
          this.addData();

      //change the value of the BehaviorSubject with newLeadForm.
      //console.log("hlo",this.newSmActivityForm.value);

    }
  
     pageInfo(value):void{
      let smData = {};
      smData['sms_id'] = 1;
      smData['page_id'] = this.listPage[value].id;
      smData['page_name'] = this.listPage[value].global_brand_page_name;
     // smData['schedule_date'] = this.sDate;
      this.smInfo.push(smData);
     // console.log('smData',smData)
    }
    instaPageInfo(value):void{
      let smData = {};
      smData['sms_id'] = 2;
      smData['page_id'] = this.listInstaPage[value].id;
      smData['page_name'] = this.listInstaPage[value].username;
     // smData['schedule_date'] = this.sDate;
      this.smInfo.push(smData);
     //console.log('smData',smData)

    }
    setsmInfo(){
      console.log(this.smInfo)

      for(let i=0; i<this.smInfo.length; i++){
       // this.smInfo[i] ['schedule_date'] = this.sDate;
      }
      if(this.smInfo.length != 0){
        // this.newSmContentsForm.get('activity_records').setValue(this.smInfo);
        this.newSmActivityForm.patchValue({'activity_records':this.smInfo})

        return true;
      }
      else{
        return false;
      }
    }
    addData() {
      let validaction = this.setsmInfo();
      if(validaction == true ){
   
      // this.newSmContentsForm.get(['social_media_content','content_file']).setValue(this.uploadInfo);
   
      // console.log('newSmContentsForm',this.newSmActivityForm.value)
      //  this.marketingService.setData(this.newSmActivityForm.value).subscribe((res) => {
      //    if(res['status'] == 200) {
      //      this.toastr.success(res['message'], 'Success!');
      //    } else {
      //      this.toastr.error(res['message'], 'Error!');
      //    } 
      //    //this.ngZone.run(() => this.router.navigateByUrl('/list-post'));
      //  });
      this.marketingService.setData(this.newSmActivityForm.value);

      }
      else{
       this.toastr.error('Error!- you must select aleast one soical media info');
      }
       
     }
  signOut(): void {
    this.socialAuthService.signOut();
  }
  // onSubmit() {
  //   if (this.newSmActivityForm.invalid) {
  //     return;
  //   }
  //   this.addData();
  // }

  get f() {
    return this.newSmActivityForm.controls;
  }

}
