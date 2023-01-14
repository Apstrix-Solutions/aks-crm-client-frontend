import { Component, OnInit } from '@angular/core';
import { ListEmailService } from './list-email.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-list-email',
  templateUrl: './list-email.component.html',
  styleUrls: ['./list-email.component.scss']
})
export class ListEmailComponent implements OnInit {
  marketingList:any=[]


  constructor(public listemailservice:ListEmailService,public toastr: ToastrService) { }

  ngOnInit(): void {
    this.getMarketing()
  }
  getMarketing(){
    this.listemailservice.getMarketing().subscribe((data:any)=>{
      this.marketingList = data['campaign']
      console.log('this.marketingList',this.marketingList);
      
    })

  }
  open(content, id) {
    console.log('......');
    
    if (confirm('Are you sure to delete ?')) {
      this.listemailservice.deleteMarketing(id).subscribe((res) => {
        console.log('res in dele',res);
        
        this.getMarketing()

        if (res['status'] == true) {
          this.toastr.success(res['campaign'], 'Success!');
        } else {
          this.toastr.error(res['errorMessage'], 'Error!');
        }
      });
    }
  }

}
