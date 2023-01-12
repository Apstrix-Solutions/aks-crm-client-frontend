import { Component, OnInit } from '@angular/core';
import { ListCampainsService } from './list-campains.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AddCampainsService } from '../add-campaign/add-campains.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import{AddCampainsService} from '../add-campaign/add-campains.service'

@Component({
  selector: 'app-list-campains',
  templateUrl: './list-campains.component.html',
  styleUrls: ['./list-campains.component.scss']
})
export class ListCampainsComponent implements OnInit {

  newAddLeadForm!: FormGroup;

  campainList :any =[]
  messagepreview =[]
  selectedGroup:any =[]
  groupList :any =[]
  typeselect : any
  AgencyId :any
  currentUser:any
  ststs:any
  id: string;
  isAddMode: boolean;
  selectId:Number;
  recievedData: any = {};


  constructor(private route: ActivatedRoute,  
    public addcampainservice:AddCampainsService,
    public toastr: ToastrService,
    public listservice:ListCampainsService,
    public campainservice:ListCampainsService,
    private formBulider: FormBuilder) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    const AgencyId = localStorage.getItem('AgencyId'); 
    this.AgencyId = Number(AgencyId)
    console.log( this.AgencyId);
    
    const currentUser = localStorage.getItem('userId');
    this.currentUser = Number(currentUser)
     
    this.newAddLeadForm = this.formBulider.group({
      name: [null, [Validators.required]],
      group_id: [ this.selectId,[Validators.required]],
      from_details: [null, [Validators.required]],
      scheduled:[null,[Validators.required]],
      status:[this.ststs,[Validators.required]],
      type:[this.typeselect,[Validators.required]],
      agent_id:[ this.AgencyId,[Validators.required]],
      created_by:[this.currentUser,[Validators.required]],
      subject:[null,[Validators.required]],
      messageContent:[this.messagepreview,[Validators.required]],
      marketing_template_type:['marketing'],
      templateType:[3],
      user_template_id:[66]

    });   
    this.getGroupData() 

    // this.listCampaign()
  }
  get f() {
    return this.newAddLeadForm.controls;
  }

  onSubmit(){
    console.log('......',this.newAddLeadForm.value);
    
    if (this.newAddLeadForm.invalid) {
      return;
    }
    this.saveCampaigns();
  }
  selectGroup(event:any){
    const selectId = event.target.value   
    this.selectId = Number(selectId)  
     
   }
  getGroupData(){
    this.listservice.getGroupData().subscribe((data:any)=>{
      this.groupList = data['group'] 
      console.log('this.groupList',this.groupList);
      
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

updateLeads(){
  this.addcampainservice.updateLeads(this.id,this.newAddLeadForm.value).subscribe((data:any)=>{
    this.recievedData = data;
    this.newAddLeadForm.patchValue(this.recievedData);
    console.log('dataaaa',data);
   
  })

}


  // listCampaign(){
  //   this.campainservice.listCampaign().subscribe((data:any)=>{
  //     console.log('data',data.campaign);
  //     this.campainList=data['campaign']
  //     console.log('this.campainList',this.campainList);     
  //   })

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
