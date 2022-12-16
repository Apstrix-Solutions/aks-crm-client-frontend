import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, NgZone, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { SettingsService } from '../settings.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { environment } from '@env/environment';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss'],
})

export class AccountSettingsComponent implements OnInit {
  id: string;
  isAddMode: boolean;
  newSettingsData!: FormGroup;
  fileObj :any [];
  ImageProp:any = [];
  files: File[] = [];
  uploadedFileResponse:any =[];
  settingsList: any = [];
  refreshToken:string;

  constructor(
    private formBuilder: FormBuilder, 
    private route: ActivatedRoute,
    private settingsService: SettingsService,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']; 
    this.isAddMode = !this.id;

    this.newSettingsData = this.formBuilder.group({
      language:[null, [Validators.required]],
      app_name:[null, [Validators.required]],
      timezone:[null, [Validators.required]],
      currency:[null, [Validators.required]],
      symbol:[null, [Validators.required]],
      file_uploaded: this.formBuilder.group({
        file_name:[null],
        file_path:[null]
      })
    })

    this.ImageProp="../../../../assets/img/user.svg";

    this.settingsService.getSettings().pipe(first()).subscribe(res => {
      
      this.refreshToken = res.headers.get('refresh_token');
      localStorage.setItem('refreshToken', this.refreshToken)

      this.settingsList = res['data']['data'];
      console.log(this.settingsList)
      this.showFormData();
    });
  }

  ngDoCheck() {
    if (this.refreshToken) {
      localStorage.setItem('refreshToken', this.refreshToken)
    }
  }

  get f() { return this.newSettingsData.controls; }

  updateSettings() {

    if(this.uploadedFileResponse.length){
        let uploadedFile = this.uploadedFileResponse.data.data;
        let uploadedFileData = this.newSettingsData.value.file_uploaded;

        uploadedFileData.file_name = uploadedFile.file_name;
        uploadedFileData.file_path = uploadedFile.file_path;
    }

    this.settingsService.updateSettings(this.newSettingsData.value,this.id).subscribe( (res) => {
      this.refreshToken = res.headers.get('refresh_token');
      if(res['body']['status'] == 200) {
        this.toastr.success(res['message'], 'Success!');
      } else {
        this.toastr.error(res['message'], 'Error!');
      }
    })
  }

  onSelect(event) {
    this.files.push(...event.addedFiles);
    this.uploadFile();
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1); //remaining file.
    let fileUploaded = this.newSettingsData.value.file_uploaded.file_name;
    fileUploaded = fileUploaded ?  fileUploaded.filter( item => item.name!=event):'';
  }

  uploadFile(){
    if(this.files){
      this.settingsService.uploadFile(this.files[0]).subscribe( (res) => {
        this.refreshToken = res.headers.get('refresh_token');
        this.uploadedFileResponse = res;
      })
    }
  }

  showFormData() {
    this.newSettingsData.patchValue({
      app_name: this.settingsList.AppName,
      language: this.settingsList.Language,
      timezone: this.settingsList.Timezone,
      currency: this.settingsList.Timezone,
      symbol: this.settingsList.CurrSymbol,
    })

    //this.ImageProp = `${environment.apiUrl}` + '/' +this.settingsList.FilePath + '/' + this.settingsList.FileName
  }
}
