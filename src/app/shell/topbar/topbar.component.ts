import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../auth/authentication.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  msg:string;

  constructor(    
    private authenticationService: AuthenticationService
    ) { }

  ngOnInit(): void {
  }
 logout(){
  this.authenticationService.logout();

 }
}
