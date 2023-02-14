import { Component, NgZone, OnInit , ViewChild, ElementRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkflowService } from '../workflow.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-workflow',
  templateUrl: './add-workflow.component.html',
  styleUrls: ['./add-workflow.component.scss']
})
export class AddWorkflowComponent implements OnInit {
  addWorkflowForm !: FormGroup;
  id: string;
  isAddMode: boolean;
  workflowById: any;
  isActionType: String;
  @ViewChild('checkStatus') public checkStatus: ElementRef;

  constructor(
    private formBuilder : FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private workflowService: WorkflowService,
    private toastr: ToastrService,
    private ngZone: NgZone,

  ) { }

  ngOnInit(): void {
    this.id  = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.addWorkflowForm = this.formBuilder.group({
      name:[null, Validators.required],
      condition:[null],
      actionType:[null],
      agencyId:[null],
      status:[null],
      workflow:[null]
    })

    if(this.id){
      this.getWorkflowById();
    }
    
  }

  getWorkflowById(){
    this.workflowService.getWorkflowById(this.id).subscribe( (res) => {
      this.workflowById = res['body']['data']['workflows'];

      if(this.workflowById.actionType =='webhook') this.isActionType = 'webhook';
      else if(this.workflowById.actionType =='email_notification') this.isActionType = 'email_notification';
      else if(this.workflowById.actionType == 'function' ) this.isActionType = 'function';
      this.addWorkflowForm.patchValue(this.workflowById);

      // console.log('this.addWorkflowForm',this.addWorkflowForm.value)
      if(this.workflowById.status == 'disable' ) this.checkStatus.nativeElement.checked = false;


    } )
  }

  

  addWorkflow(){

    this.workflowService.addWorkflow(this.addWorkflowForm.value).subscribe( (res) => {
      console.log(res);
      if(res['body']['code']==200){
        this.toastr.success('Successfullty created workflow!');
        this.ngZone.run(() => this.router.navigateByUrl('/list-workflow'));
      }
      else{
        this.toastr.error('Error Occured!')
      }
    });

  }

  updateWorkflow(){
    this.workflowService.updateWorkflow( this.id, this.addWorkflowForm.value).subscribe( (res) => {
      console.log(res)

      if(res['body']['code']==200){
        this.toastr.success('Successfully updated workflow!');
        this.ngZone.run(() => this.router.navigateByUrl('/list-workflow'));
      }
      else{
        this.toastr.error('Error!')
      }

    })

  }

  changeActionType(event: any){
    const action = event.target.value;
    if(action == 'webhook') this.isActionType = 'webhook';
    else if(action == 'email_notification') this.isActionType = 'email_notification';
    else if(action == 'function' ) this.isActionType = 'function';
  }

  onSubmit(){
    console.log(this.addWorkflowForm.value);
    if (this.addWorkflowForm.invalid) {
      return;
    }
    if (this.isAddMode) {
      this.addWorkflow();
    } else {
      this.updateWorkflow();
    }
  }

  get f(){
    return this.addWorkflowForm.controls;
  }
}
