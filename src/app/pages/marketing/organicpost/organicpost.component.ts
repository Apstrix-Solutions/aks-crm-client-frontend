import { Component,NgZone, OnInit } from '@angular/core';
import { FacebookLoginProvider, SocialAuthService,  SocialUser, } from 'angularx-social-login';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MarketingService } from '../marketing.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-organicpost',
  templateUrl: './organicpost.component.html',
  styleUrls: ['./organicpost.component.scss']
})
export class OrganicpostComponent implements OnInit {
  newSmContentsForm!: FormGroup;
  loginForm!: FormGroup;
  socialUser!: SocialUser;
  isLoggedin?: boolean = undefined;
  refreshToken: string;
  facebookAuthToken: string;
  listPage:  any = [];
  listInstaPage: any =[];
  activity_records: any=[];
  files: File[] = [];
  social_media_content: any=[];
  uploadInfo:  any = [];
  uploadedFileResponse:any =[];
  smInfo: any = [];
  smInfoResponse:any =[];
  sDate:string;
  ownershipInfo:string = '';
  constructor(
    private formBulider: FormBuilder,
    private socialAuthService: SocialAuthService,
    private marketingService: MarketingService,
    public toastr: ToastrService,
    private ngZone: NgZone,
    private router: Router,
  ) {
    console.log(this.isLoggedin);
  }


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
    this.newSmContentsForm = this.formBulider.group({
      activity_title: [null,[Validators.required]],
      ownership:[null,[Validators.required]],
      activity_type:[1],
      start_date:[null],
      end_date:['0001-01-01 00:00:00'],
      post_type:[null],
      activity_records :this.formBulider.group([null]),
      social_media_content:this.formBulider.group({
        content_title:['Title of the Sample Post No:1 Created'],
        content_description:[null],
        content_file: []
      }),
      is_deleted: [false],
      content_status: [1],
      //page:[null],
      //instaPage:[null]
    });

  }

  loginWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.instaPage();
  }
  signOut(): void {
    this.socialAuthService.signOut();
  }
  onSelected(value:string): void {
    this.ownershipInfo = value;
    if (value == 'agency'){
      this.ownedPage();
      this.newSmContentsForm.controls['ownership'].setValue(true);
    }
    else if(value == 'client'){
      this.clientPage();
      this.newSmContentsForm.controls['ownership'].setValue(false);
    }
	}
  ownedPage() {
    this.marketingService.ownedPage().subscribe((data) => {
    this.refreshToken = data.headers.get('refresh_token');
    this.listPage = this.formatListPage( data['body']['data']['data']);
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
      this.refreshToken = data.headers.get('refresh_token');
      this.listInstaPage = this.formatListPage( data['body']['data']['data']);
    });
  };
  scheduleDate(value:string):void{
    this.sDate = value;
    this.newSmContentsForm.controls['start_date'].setValue(value);
  }
  contentDescription(value:string):void{
    this.newSmContentsForm.get(['social_media_content','content_description']).setValue(value);
  }
  onSelect(event) {
    this.files.push(...event.addedFiles);
    this.uploadFile();
  }
  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  formatListPage(data){
  for(let i =0; i<data.length;i++){
    data[i].index = i;
  }
  return data;
  }
  pageInfo(value):void{
    let smData = [];
    smData['sms_id'] = 1;
    smData['page_id'] = this.listPage[value].id;
    smData['page_name'] = this.listPage[value].global_brand_page_name;
    smData['schedule_date'] = this.sDate;
    this.smInfo.push(smData);
  }
  instaPageInfo(value):void{
    let smData = [];
    smData['sms_id'] = 2;
    smData['page_id'] = this.listInstaPage[value].id;
    smData['page_name'] = this.listInstaPage[value].username;
    smData['schedule_date'] = this.sDate;
     this.smInfo.push(smData);
    // console.log(this.smInfo);
  }
  addContent() {
   let validaction = this.setsmInfo();
   if(validaction == true ){
    this.marketingService.addContent(this.newSmContentsForm.value).subscribe((res) => {
      if(res['status'] == 200) {
        this.toastr.success(res['message'], 'Success!');
      } else {
        this.toastr.error(res['message'], 'Error!');
      } 
      this.ngZone.run(() => this.router.navigateByUrl('/list-post'));
    });
   }
   else{
    this.toastr.error('Error!- you must select aleast one soical media info');
   }
    
  }
  setsmInfo(){
    debugger;
    for(let i=0; i<this.smInfo.length; i++){
      this.smInfo[i] ['schedule_date'] = this.sDate;
    }
    if(this.smInfo.length != 0){
      this.newSmContentsForm.get(['activity_records']).setValue([this.smInfo]);
      console.log([this.smInfo]);
      return true;
    }
    else{
      return false;
    }
  }
  uploadFile(){
    
    if(this.files){
      let fileslength = this.files.length;
      this.marketingService.addedFiles(this.files[fileslength-1]).subscribe( (res) => {
        this.refreshToken = res.headers.get('refresh_token');
        this.uploadedFileResponse ['id']=res['body']['data']['data'].id;
        this.uploadedFileResponse ['file_url']=res['body']['data']['data'].url;
        this.uploadInfo.push(this.uploadedFileResponse);
        this.newSmContentsForm.get(['social_media_content','content_file']).setValue(this.uploadInfo);
      })
    }
  }
  onSubmit() {
    this.addContent();
  };
  get f() {
    return this.newSmContentsForm.controls;
  }
}
