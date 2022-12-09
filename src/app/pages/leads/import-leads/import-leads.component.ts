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

  constructor(
    private leadsService: LeadService,
    private route: ActivatedRoute,
    public toastr: ToastrService,
    private formBuilder: FormBuilder, 
    private ngZone: NgZone,

  ) { }

  ngOnInit(): void {
    this.importLeadsData = this.formBuilder.group({
      fileSelected:[null,[Validators.required, this.requiredFileType('csv')]],
    })

  }

  requiredFileType(type: string){
    return (control: FormControl) => {
      const file = control.value;
      console.log('file',file);

      if(file){
          const extension = file.split('.')[1].toLowerCase();
          console.log('extension',extension);
          if(type.toLowerCase() != extension.toLowerCase()){
            return true;
          }
          return false;
      }
      return false;
    }
  }

  onFilePicked(event: any){
    this.fileChosen = this.importLeadsData.value.fileSelected.includes('.csv') 
  }

  uploadFile(){
    
    console.log('upload importLeadsData - ',this.importLeadsData.value)
    const formData = new FormData();

    formData.append("filec", this.importLeadsData.value.fileSelected);
    this.leadsService.importLead(formData).subscribe( res => {
      console.log(res)
    })
    
  }

  get f(){ return this.importLeadsData.controls; }


}
