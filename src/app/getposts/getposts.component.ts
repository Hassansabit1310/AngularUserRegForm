import { Component, OnInit, Renderer2 } from '@angular/core';
import { Post } from '../posts/posts.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-getposts',
  templateUrl: './getposts.component.html',
  styleUrls: ['./getposts.component.css']
})
export class GetpostsComponent implements OnInit {
  posts:Post[]=[]

  constructor(
    private userService:UserService,
    private rend: Renderer2) { }

  ngOnInit(): void {

    this.userService.getPosts.subscribe(
      (data:Post[])=>{
        this.posts=data
        console.log(this.posts);
        console.log(typeof(this.posts));

        
        
        
          }


    )
  }

}
