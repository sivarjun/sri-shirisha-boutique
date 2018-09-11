import { Component, OnInit } from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-upload-designs',
  templateUrl: './upload-designs.component.html',
  styleUrls: ['./upload-designs.component.css']
})
export class UploadDesignsComponent implements OnInit {
   uploader:FileUploader;
   baseUrl=environment;
   hasBaseDropZoneOver = false;
  
  constructor() { }

  ngOnInit() {
    this.initializeUploader();
  }

 fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
  initializeUploader() {
    this.uploader = new FileUploader({
      url:'http://localhost:62066/api/UploadImages',
     // authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });
this.uploader.onAfterAddingFile= (file)=>{file.withCredentials=false}
   
  }

 

}
