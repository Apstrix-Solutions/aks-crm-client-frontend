import { Component, OnInit,NgZone } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.scss']
})
export class ListCustomerComponent implements OnInit {
  customerList: any = [];

  constructor(
    private customerService: CustomerService,
    public toastr: ToastrService,
    private ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getAllCustomer();
  }

  getAllCustomer(){
    this.customerService.getAllCustomer().subscribe( (res) => {
      console.log(res)
      this.customerList = res['body']['data']['data']
    })
  }

  open(content, contactId) {
    if (confirm('Are you sure to delete ?')) {
      // this.customerService.deleteContact(contactId).subscribe((res) => {
      //   // this.getContactById();

      //   if (res['code'] == 200) {
      //     this.toastr.success(res['message'], 'Success!');
      //   } else {
      //     this.toastr.error(res['errorMessage'], 'Error!');
      //   }
      // });
    }
  }


}
