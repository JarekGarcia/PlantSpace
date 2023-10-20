import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"
import { Comment } from "../models/Comment.js"


class CommentsService {



    async getCommentsByPostId() {
        const vegetable = AppState.activeVegetable
        // @ts-ignore
        const res = await api.get(`api/posts/${vegetable.id}/comments`)
        console.log(res.data)
        const newComment = res.data.map(pojo => new Comment(pojo))
        console.log('new comment in the service', newComment);
        AppState.comments = newComment
    }

    // async createComment(commentData) {
    //     const res = await api.post(`api/comments`, commentData)
    //     console.log("Created comment", commentData)
    // }

}

export const commentsService = new CommentsService()