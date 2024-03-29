export class Artwork {
    id: number = 0;
    title: string = "Title";
    description: string = "Synopsis";
    coverUrl: string = ""; //url of the cover
    backgroundImageUrl: string = "../assets/test-news.png"; //url of the background
    views: number = 0;
    authorId: number = 0 ;
    type= "MANGA";
    tags: string[] = [];
    shopId: number|null = null;
}