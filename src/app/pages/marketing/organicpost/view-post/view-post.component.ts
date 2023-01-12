import { Component, OnInit,NgZone } from '@angular/core';
import { MarketingService } from '../../marketing.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss']
})
export class ViewPostComponent implements OnInit {
  id: string;
  postId: string;
  postDetails: any = [];

  constructor( 
    private router: Router, 
    private marketingService: MarketingService,
    private route: ActivatedRoute,
    private ngZone: NgZone,
    ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.postId = this.id;
    console.log(this.postId);
    this.getPostById();

  }
  getPostById(){
    this.marketingService.getPostById(this.postId).subscribe((res) => {
      this.postDetails = res['body']['data']['data'][0];
       console.log('getpostById',this.postDetails)
    });
  }
}
