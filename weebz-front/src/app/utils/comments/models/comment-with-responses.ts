import { Comment } from "./comment";

export class CommentWithResponses extends Comment {
    replies: Comment[] = [];
}