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

  constructor(
    private leadsService: LeadService,
    private route: ActivatedRoute,
    public toastr: ToastrService,
    private formBuilder: FormBuilder, 
    private ngZone: NgZone,

  ) { }

  ngOnInit(): void {
    this.importLeadsData = this.formBuilder.group({
      fileSelected:[null,[Validators.required]],
    })

  }

  // requiredFileType(type: string){
  //   return (control: FormControl) => {
  //     const file = control.value;
  //     console.log('file',file);

  //     if(file){
  //         const extension = file.split('.')[1].toLowerCase();
  //         console.log('extension',extension);
  //         if(type.toLowerCase() != extension.toLowerCase()){
  //           return true;
  //         }
  //         return false;
  //     }
  //     return false;
  //   }
  // }

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
    console.log(this.file)
    
    this.leadsService.importLead(this.file).subscribe( res => {
      if (res['code'] == 200) {
        this.toastr.success(res['message'], 'Success');
      } else {
        this.toastr.error(res['message'], 'Error!');
      }
    })
    
  }

  get f(){ return this.importLeadsData.controls; }


}
