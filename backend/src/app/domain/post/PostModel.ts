export default class PostModel {
    id: string = '';
    registration: number = 0;
    title: string = '';
    bodyPost: string = '';
    createdAt: Date | null = null;
    updatedAt: Date | null = null;
    userId: string = '';
    constructor(title: string, bodyPost: string, userId: string) {
        this.title = title;
        this.bodyPost = bodyPost;
        this.userId = userId;
    }
}