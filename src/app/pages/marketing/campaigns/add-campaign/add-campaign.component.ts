import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import {FormControl, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { ThisReceiver } from '@angular/compiler';
import { ActivatedRoute, Router } from '@angular/router';
import { AddCampainsService } from './add-campains.service';

@Component({
  selector: 'app-add-campaign',
  templateUrl: './add-campaign.component.html',
  styleUrls: ['./add-campaign.component.scss']
})
export class AddCampaignComponent implements OnInit {
  newAddLeadForm!: FormGroup;
  recievedData: any = {};
  id: string;
  isAddMode: boolean;
  ststs:any
  typeselect : any
  groupList :any =[]
  selectedGroup:any =[]
  messageContents :any =[]
  messagepreview :any=[]
  AgencyId :any
  currentUser:any
  selectId:Number
  updateList:any

  constructor(public addcampainservice:AddCampainsService,
    private formBulider: FormBuilder,     
    private route: ActivatedRoute,  
     public toastr: ToastrService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log('this.id',this.id);
    
    const AgencyId = localStorage.getItem('AgencyId'); 
    this.AgencyId = Number(AgencyId)
    console.log( this.AgencyId);
    
    const currentUser = localStorage.getItem('userId');
    this.currentUser = Number(currentUser)
     
      this.newAddLeadForm = this.formBulider.group({
        name: [null, [Validators.required]],
        scheduled:[null,[Validators.required]],
        status:[this.ststs,[Validators.required]],
        type:[this.typeselect,[Validators.required]],
        agent_id:[ this.AgencyId,[Validators.required]],
        created_by:[this.currentUser,[Validators.required]],
        from_details: [null, [Validators.required]],
        user_template_id:[66],
        group_id: [ this.selectId,[Validators.required]],
        subject:[null,[Validators.required]],
        messageContent:[this.messagepreview,[Validators.required]],
        marketing_template_type:['marketing'],
        templateType:[3]

      });   
      this.getGroupData() 
      
      if(this.id){
        this.GetMarketing()
      }

  }
  get f() {
    return this.newAddLeadForm.controls;
  }
  onSubmit() {
    if (this.newAddLeadForm.invalid) {
      return;
    }
     if(this.id){
      this.updateLeads();
    }
   else {
      this.saveCampaigns();
    }
  }
  getGroupData(){
    this.addcampainservice.getGroupData().subscribe((data:any)=>{
      this.groupList = data['group']  
      console.log(' this.groupList', this.groupList);      
    })
  }

  GetMarketing(){
    this.addcampainservice.GetMarketing(this.id).subscribe((data:any)=>{
      console.log(data);      
      this.updateList = data.campaign[0]
      console.log('one list',this.updateList);
      
    })
  }

  saveCampaigns(){
      console.log('this.newAddLeadForm.value;',this.newAddLeadForm.value );
    this.addcampainservice.saveCampaigns(this.newAddLeadForm.value).subscribe((data:any)=>{
      console.log('data,,',data);     
      if (data['status'] == true) {
        this.toastr.success(
          data['message'],
          'Successfully created the contact'
        );                
      } else {
        this.toastr.error(data['message'], 'Error!');
      } 

    })
  }
  selectGroup(event:any){
    const selectId = event.target.value   
    this.selectId = Number(selectId)  
     
   }

  updateLeads(){
    console.log('........');
    
    console.log('update',this.newAddLeadForm.value );
    
    this.addcampainservice.updateLeads(this.id,this.newAddLeadForm.value).subscribe((data:any)=>{
      if (data['status'] == true) {
        this.toastr.success(
          data['message'],
          'Successfully created the contact'
        );                
      } else {
        this.toastr.error(data['message'], 'Error!');
      } 
      // this.recievedData = data;
      // this.newAddLeadForm.patchValue(this.recievedData);
      // console.log('dataaaa',data);
     
    })

  }

  // addCampaign(){
  //   console.log('this.newAddLeadForm.value;',this.newAddLeadForm.value );
    
   
  //   this.addcampainservice.addCampaign(this.newAddLeadForm.value).subscribe((data) => {
  //     console.log('data',data);
  //     if (data['status'] == true){
  //       this.toastr.success(
  //         data['message']
  //       );
  //     }     
  //   });  
  // }
  statuss(event:any){
   this.ststs=(event.target.value);
   console.log('this.ststs',this.ststs);   
  }
  typeSelect(event:any){
    this.typeselect = event.target.value
    console.log('this.typeselect',this.typeselect);
  }

}
