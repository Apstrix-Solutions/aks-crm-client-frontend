import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddTextService } from './add-text.service'
import {  HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import {FormControl, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { ThisReceiver } from '@angular/compiler';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-text',
  templateUrl: './add-text.component.html',
  styleUrls: ['./add-text.component.scss']
})
export class AddTextComponent implements OnInit {
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
  date:any;
  currentDate: any;

  constructor(public addtextservice:AddTextService,
    private formBulider: FormBuilder,     
    private route: ActivatedRoute,  
     public toastr: ToastrService,
     public datepipe: DatePipe,
     public router:Router


    ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log('this.id',this.id);
    let date: Date = new Date();  
    console.log("Date = " + date);
   
    this.currentDate =  this.datepipe.transform(date, 'yyyy-MM-dd');
    
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
    else if(!this.id){
      this.saveCampaigns();
    }
   else {
    this.updateLeads();
    }
  }
  getGroupData(){
    this.addtextservice.getGroupData().subscribe((data:any)=>{
      this.groupList = data['group']  
      console.log(' this.groupList', this.groupList);      
    })
  }

  GetMarketing(){
    this.addtextservice.GetMarketing(this.id).subscribe((data:any)=>{
      console.log(data);      
      // this.updateList = data.campaign[0]
      // console.log('one list',this.updateList);
      const getEmailById = data.campaign[0];
      console.log('getEmailById',getEmailById)

      this.updateList =getEmailById;
      console.log('this.updateList',this.updateList);
      
      this.newAddLeadForm.patchValue(getEmailById);

      console.log('----data',this.newAddLeadForm.value)

      const datas =  this.updateList
      this.date = this.datepipe.transform( this.updateList.scheduled,'yyyy-MM-dd');
      this.currentDate = this.date;
      this.newAddLeadForm.patchValue({scheduled:this.date})
      console.log('date', this.date);
      const messagecontent =this.updateList.messageContent

      this.messagepreview.push(messagecontent)


            
    })
  }
  saveCampaigns(){
    console.log('this.newAddLeadForm.value;',this.newAddLeadForm.value );
  this.addtextservice.saveCampaigns(this.newAddLeadForm.value).subscribe((data:any)=>{
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
  this.addtextservice.updateLeads(this.id,this.newAddLeadForm.value).subscribe((data:any)=>{
    if (data['status'] == true) {
      this.toastr.success(
        'updated successfully',
      ); 
      this.router.navigateByUrl('/list-text')

    } else {
      this.toastr.error(data['message'], 'Error!');
    } 

  })

}
statuss(event:any){
  this.ststs=(event.target.value);
  console.log('this.ststs',this.ststs);   
 }
 typeSelect(event:any){
   this.typeselect = event.target.value
   console.log('this.typeselect',this.typeselect);
 }
}
