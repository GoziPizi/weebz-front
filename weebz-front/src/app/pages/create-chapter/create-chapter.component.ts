import { Component, OnInit } from '@angular/core';
import { ApiHandlerService } from 'src/app/services/api-handler.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-chapter',
  templateUrl: './create-chapter.component.html',
  styleUrls: ['./create-chapter.component.scss']
})
export class CreateChapterComponent implements OnInit {

  artworkId: number = 0;
  coverUrl: string = "";
  backgroundUrl: string = "";

  constructor(
    private apiHandler: ApiHandlerService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.artworkId = Number(this.route.snapshot.paramMap.get('artworkId'));
    if(this.artworkId == 0) {
      this.router.navigate(['/']);
    }
    this.fetchArtworkData();
  }

  fetchArtworkData() {
    this.apiHandler.getArtwork(this.artworkId).subscribe((res: any) => {
      this.coverUrl = res.coverUrl;
      this.backgroundUrl = res.backgroundImageUrl;
    });
  }

  ngOnInit(): void {
  }

}
