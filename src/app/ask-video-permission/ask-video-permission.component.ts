import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ask-video-permission',
  standalone: true,
  imports: [],
  templateUrl: './ask-video-permission.component.html',
  styleUrl: './ask-video-permission.component.scss'
})
export class AskVideoPermissionComponent implements OnInit{
async  ngOnInit() {
    // try {
    //     const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    //     const videoElement = document.getElementById('video')as any;
    //     if(videoElement){
    //       videoElement.srcObject = stream;

    //     }
    // } catch (error) {
    //     console.error('Error accessing webcam: ', error);
    // }
  }
}
