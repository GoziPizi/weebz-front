import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chapter-thumbnail',
  templateUrl: './chapter-thumbnail.component.html',
  styleUrls: ['./chapter-thumbnail.component.scss']
})
export class ChapterThumbnailComponent implements OnInit {

  /**
   * A component that displays a thumbnail of a chapter.
   * It is made of :
   * - The cover of the chapter
   * - The number of the chapter written under the cover
   * - On hover, a zoom.
   * 
   * How to use : 
   *  Prove at least the artworkId and the chapter number.
   *  You can provide an image and a link to the chapter.
   *  If not, it will be asked to the api.
   */

  @Input() artworkId: number;
  @Input() number: number;
  @Input() id: number;

  @Input() image:string="";
  @Input() route:string="";

  //TODO : ask api for image and link if not provided

  constructor(
    private router: Router
  ) {
    this.artworkId = 0;
    this.number = 0;
    this.id = 0;
  }

  ngOnInit(): void {
  }

  navigate(){
    if(this.route != ""){
      this.router.navigate([this.route]);
    }
  }

}
