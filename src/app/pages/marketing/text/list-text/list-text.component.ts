import { Component, OnInit } from '@angular/core';
import { ListTextService } from './list-text.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-list-text',
  templateUrl: './list-text.component.html',
  styleUrls: ['./list-text.component.scss']
})
export class ListTextComponent implements OnInit {
  marketingList:any=[]


  constructor(
    public listtextservice:ListTextService,     
    public toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.getMarketing()
  }
  getMarketing(){
    this.listtextservice.getMarketing().subscribe((data:any)=>{ 
      this.marketingList = data['campaign']
      console.log('this.marketingList',this.marketingList);
      
    })

  }
  open(content, id) {
    console.log('......');
    
    if (confirm('Are you sure to delete ?')) {
      this.listtextservice.deleteMarketing(id).subscribe((res) => {
        console.log('res',res);
        
        this.getMarketing()

        if (res['body']['code'] == 200) {
          this.toastr.success('Lead has been deleted successfully', 'Success!');
        } else {
          this.toastr.error(res['errorMessage'], 'Error!');
        }
      });
    }
  }

}
