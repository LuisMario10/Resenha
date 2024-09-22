import PostModel from "../post/PostModel";

export default class UserModel {
    id: string = '';
    username: string = ''
    email: string = ''
    password: string = ''
    post: PostModel[] = []
    constructor(username: string, email: string, password: string) {
        this.username = username;
        this.email = email;
        this.password = password
    }
}