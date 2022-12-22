import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LeadService } from '../lead.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-import-leads',
  templateUrl: './import-leads.component.html',
  styleUrls: ['./import-leads.component.scss']
})
export class ImportLeadsComponent implements OnInit {
  fileChosen: boolean = false;
  importLeadsData!: FormGroup;
  file:any;
  isDisabled: boolean = true;
  refreshToken:string;

  constructor(
    private leadsService: LeadService,
    private route: ActivatedRoute,
    public toastr: ToastrService,
    private formBuilder: FormBuilder, 
    private ngZone: NgZone,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.importLeadsData = this.formBuilder.group({
      fileSelected:[null,[Validators.required]],
    })

  }
  ngDoCheck() {
    if (this.refreshToken) {
      localStorage.setItem('refreshToken', this.refreshToken);
    }
  }

  onFilePicked(event: any){
    this.file = event.target.files[0];
    console.log(this.file)
    
    if(this.file) {
      this.fileChosen = !this.importLeadsData.value.fileSelected.includes('.csv') 
      if(this.file.type === "text/csv"){
      this.isDisabled = false;
      }else{
        this.isDisabled = true;   
      }
    }
  }

  uploadFile(){
    
    this.leadsService.importLead(this.file).subscribe( res => {
      this.refreshToken = res.headers.get('refresh_token');
      const duplicateLead = res['body']['data']['duplicates'];

      if (res['body']['code'] == 200 && duplicateLead.length == 0) {
        this.toastr.success(res['message'], 'Leads has been imported successfully');
        this.ngZone.run(() => this.router.navigateByUrl('/leads'));
      } else if (res['body']['code'] == 200 && duplicateLead.length > 0) {
        this.toastr.success(res['message'], 'Leads has been imported successfully');
        this.toastr.error(duplicateLead, 'Few  emails already existing!');
        this.ngZone.run(() => this.router.navigateByUrl('/leads'));
      } else {
        this.toastr.error(res['message'], 'Error!');
      }
  })
};

  get f(){ return this.importLeadsData.controls; }


}
