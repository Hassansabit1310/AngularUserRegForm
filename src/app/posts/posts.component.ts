import { Component, ElementRef, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Post } from './posts.model';
import Base64 from 'base-64'


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  showFiller = false;

  // posts:Post[]=[]

  myForm:FormGroup
  srcResult: any;
@ViewChild("fileInput")file:ElementRef<HTMLInputElement>
  imgBlob: string;
  constructor(
    private fb:FormBuilder,
    private userService:UserService
  ) { }

  ngOnInit(): void {

    this.myForm=this.fb.group({
      description:'',
      img:''
    })

   
  }
  get description() {
    return this.myForm.get("description"); 
  }
  get img() {
    return this.myForm.get("img"); 
  }
  get posts():Post{
    let posts:Post=null;
    posts={
      id:'',
      descirption:this.description.value,
      img: "data:image/bmp;base64,"+ Base64.encode(this.imgBlob)
      
      
    }
    return posts;
  }
  onSubmit():void {

    this.userService.postStatus(this.posts)
    // this.submitted = true;
    // console.log("ok");
    

    // if (this.myForm.valid) {
    //   this.userService.registerUser(this.user).then((res:"success")=>{
    //     this.alertService.success('Registration successful', true);
    //     this.router.navigate(['/login'])
    //   }).catch((err)=>{
    //     const errorMessage:string = "User already exists!" 
    //     this.alertService.error(errorMessage);
    //   })
    // }
    console.log(this.myForm.value);
    
  }

  onFileSelected() {
    this.file.nativeElement.click();
 this.file.nativeElement.onchange=((e:any)=>{
    let img=e.target.files[0];
    this.imgBlob = URL.createObjectURL(img);

console.log(this.imgBlob);
    
  })


  

}

}
