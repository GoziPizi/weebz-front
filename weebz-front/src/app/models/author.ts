import { User } from './user';

export class Author {
    id: number = 0;
    presentation: string = "";
    user: User = new User();
    socialNetworks: string[] = [];
}