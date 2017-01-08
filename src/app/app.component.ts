import { Component, ElementRef } from '@angular/core';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { Subscription } from 'rxjs';

export interface Room {
  url: string;
  doors: Array<Door>;
}

export interface Door {
  position: string;
  rotation: string;
  target: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent {
  timeout: Subscription;
  currentRoom: Room;
  rooms: Array<Room> = [
    {
      url: 'http://static.videogular.com/assets/videos/vr-route-0.mp4',
      doors: [
        { position: '-3 2 -10', rotation: '0 0 0', target: 1 }
      ]
    },
    {
      url: 'http://static.videogular.com/assets/videos/vr-route-1.mp4',
      doors: [
        { position: '-15 -3 -18', rotation: '0 -180 0', target: 0 },
        { position: '8 1 9', rotation: '0 -130 0', target: 2 }
      ]
    },
    {
      url: 'http://static.videogular.com/assets/videos/vr-route-2.mp4',
      doors: [
        { position: '-1 1 -8', rotation: '0 -30 0', target: 1 },
        { position: '0 2 7', rotation: '0 180 0', target: 3 }
      ]
    },
    {
      url: 'http://static.videogular.com/assets/videos/vr-route-3.mp4',
      doors: [
        { position: '-5 2 7', rotation: '0 130 0', target: 2 },
        { position: '3 4 7', rotation: '0 210 0', target: 4 }
      ]
    },
    {
      url: 'http://static.videogular.com/assets/videos/vr-route-4.mp4',
      doors: [
        { position: '2 1 10', rotation: '0 180 0', target: 3 },
        { position: '3 2 -10', rotation: '0 180 0', target: 0 }
      ]
    }
  ];

  constructor(ref: ElementRef) {
    this.currentRoom = this.rooms[ 0 ];
  }

  onMouseEnter($event: any, door: Door) {
    $event.target.dispatchEvent(new CustomEvent('vgStartAnimation'));

    this.timeout = TimerObservable.create(2000).subscribe(
      () => {
        this.currentRoom = this.rooms[ door.target ];
      }
    );
  }

  onMouseLeave($event: any) {
    $event.target.dispatchEvent(new CustomEvent('vgStartAnimation'));
    $event.target.dispatchEvent(new CustomEvent('vgPauseAnimation'));
    this.timeout.unsubscribe();
  }

  ngOnDestroy() {
    this.timeout.unsubscribe();
  }
}
