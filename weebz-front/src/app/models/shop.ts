import { Product } from "./product";
export class Shop {
    id: number = 0;
    name: string = "";
    authorId: number = 0;
    description: string = "";
    artworkId?: number = 0;
    backgroundUrl?: string = "";
    coverUrl?: string = "";
    products: Product[] = [];
}