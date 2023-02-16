import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FacebookCampaignService } from '../facebook-campaign.service';
import { AuthService } from '../../../auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router} from '@angular/router';

@Component({
  selector: 'app-add-fb-campaign',
  templateUrl: './add-fb-campaign.component.html',
  styleUrls: ['./add-fb-campaign.component.scss']
})
export class AddFbCampaignComponent implements OnInit {
  fbCampaignForm!: FormGroup;
  campaignObjectives: any = [];
  defaultStatus: string = 'PAUSED';
  statusList: any = ['PAUSED'];
  accountID: any = null;
  specialAddCat = ['NONE'];
  fbAccessToken: string = null;

  constructor(
    private fbCampaignService: FacebookCampaignService,
    private formBulider: FormBuilder,
    private authService: AuthService,
    public toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.getCampaignObjectives();
    this.accountID = this.authService.getFbAccountId();
    this.fbAccessToken = this.authService.getFbAuthToken();

    if(this.accountID == null) {
      this.toastr.error('Account Id is missing!', 'Error!');
    }

    if(this.fbAccessToken == null) {
      this.toastr.error('Facebook access token is missing!', 'Error!');
    }

    this.fbCampaignForm = this.formBulider.group({
      name: [null, Validators.required],
      objective:[null, Validators.required],
      status:[this.defaultStatus, Validators.required],
      special_ad_categories:[null, Validators.required],
      account_id:[this.accountID, Validators.required],
    });
  }

  onSubmit(){
    this.addNewCampaign();
  }

  addNewCampaign(){
    let specialAdds = [];
    specialAdds.push(this.fbCampaignForm.value.special_ad_categories);
    this.fbCampaignForm.patchValue({special_ad_categories:specialAdds});

    this.fbCampaignService.addCampaign(this.fbCampaignForm.value).subscribe( (res: any) => {
      if(res['status'] && res['status'] == 200) {
        this.toastr.success(res['message']);
        this.router.navigate(['/list-fb-campaign']);
      } else {
        this.toastr.error(res['message'], 'Error!');
      }
    })
  }

  getCampaignObjectives(){
    this.fbCampaignService.getCampaignObjectives().subscribe( (res: any) => {
      if(res['body']['data']['data']) {
        this.campaignObjectives = res['body']['data']['data'];
      }
    })
  }

  get f() {
    return this.fbCampaignForm.controls;
  };

}
