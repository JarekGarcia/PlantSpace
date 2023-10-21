import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"
import { Comment } from "../models/Comment.js"


class CommentsService {



    async getCommentsByPostId() {
        const vegetable = AppState.activeVegetable
        // @ts-ignore
        const res = await api.get(`api/posts/${vegetable.id}/comments`)
        const newComment = res.data.map(pojo => new Comment(pojo))
        AppState.comments = newComment
    }

    async createComment(commentData) {
        const vegetable = AppState.activeVegetable
        commentData.postId = vegetable?.id
        const res = await api.post("api/comments", commentData)
    }

    async removeComment(commentId) {
        const res = await api.delete(`api/comments/${commentId}`)
        const commentIndex = AppState.comments.findIndex(comment => comment.id == commentId)
        if (commentIndex == -1) {
            return
        }
        AppState.comments.splice(commentIndex, 1)
        AppState.emit("comments")
    }

}

export const commentsService = new CommentsService()