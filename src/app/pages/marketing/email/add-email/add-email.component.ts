import { Component, OnInit } from '@angular/core';
import {AddEmailService } from './add-email.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-email',
  templateUrl: './add-email.component.html',
  styleUrls: ['./add-email.component.scss']
})
export class AddEmailComponent implements OnInit {
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
  updateList:any
  currentDate: any;
  date:any;



  constructor(private route: ActivatedRoute,  
    public Addemailservice:AddEmailService,
    public toastr: ToastrService,
    private formBulider: FormBuilder,
    ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    console.log('id',this.id);
    

    // let date: Date = new Date();  
    // console.log("Date = " + date);
   
    // this.currentDate =  this.datepipe.transform(date, 'yyyy-MM-dd');

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
      if(this.id){
        this.GetMarketing()
      } 
   }
   GetMarketing(){
    this.Addemailservice.GetMarketing(this.id).subscribe((data:any)=>{
      console.log('getMarketing',data)
     
      const getEmailById = data.campaign[0];
      console.log('getEmailById',getEmailById)

      this.updateList =getEmailById;
      console.log('this.updateList',this.updateList);
      
      this.newAddLeadForm.patchValue(getEmailById);
      console.log('----data',this.newAddLeadForm.value)
      
    })
  }
  get f() {
    return this.newAddLeadForm.controls;
  }
  onSubmit(){
    
    if (this.newAddLeadForm.invalid) {
      return;
    }
    else if(!this.id){
      this.saveCampaigns();
    }
   else {
    this.updateLeads();
    }
  }
  selectGroup(event:any){
    const selectId = event.target.value   
    this.selectId = Number(selectId)  
     
   }
   getGroupData(){
    this.Addemailservice.getGroupData().subscribe((data:any)=>{
      this.groupList = data['group'] 
      
    })
  }
  saveCampaigns(){
    console.log('this.newAddLeadForm.value;',this.newAddLeadForm.value );
  this.Addemailservice.saveCampaigns(this.newAddLeadForm.value).subscribe((data:any)=>{
    console.log('data,,',data);     
    if (data['status'] == true) {
      this.toastr.success(
        data['message'],
      );
              
    } else {
      this.toastr.error(data['message'], 'Error!');
    } 

  })
}
updateLeads(){
  console.log('update',this.newAddLeadForm.value );   
  this.Addemailservice.updateLeads(this.id,this.newAddLeadForm.value).subscribe((data:any)=>{
    
    if (data['status'] == true) {
      this.toastr.success('campaign updated successfully'
       ,
      );                
    } else {
      this.toastr.error(data['message'], 'Error!');
    } 

  })

}
statuss(event:any){
  this.ststs=(event.target.value);
 }
 
typeSelect(event:any){
  this.typeselect = event.target.value
}

}
