import { Component, OnInit } from '@angular/core';
import { WorkflowService } from '../workflow.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-workflow',
  templateUrl: './list-workflow.component.html',
  styleUrls: ['./list-workflow.component.scss']
})
export class ListWorkflowComponent implements OnInit {
  workFlowList:any = [];

  constructor(
    private workflowService: WorkflowService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getWorkflow();
  }

  getWorkflow(){
    this.workflowService.getWorkflow().subscribe( (res) => {
      console.log(res)
      this.workFlowList = res['body']['data']['workflows'];
      console.log(this.workFlowList)
    })
  };



  open(content, contactId) {
    if (confirm('Are you sure to delete ?')) {
      this.workflowService.deleteWorkflow(contactId).subscribe((res) => {
        this.getWorkflow();

        if (res['code'] == 200) {
          this.toastr.success(res['message'], 'Success!');
        } else {
          this.toastr.error(res['errorMessage'], 'Error!');
        }
      });
    }
  }

}
