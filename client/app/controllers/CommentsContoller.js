import { AppState } from "../AppState.js"
import { commentsService } from "../services/CommentsService.js"
import { getFormData } from "../utils/FormHandler.js"
import { Pop } from "../utils/Pop.js"
import { setHTML } from "../utils/Writer.js"



function _drawComments() {
    let comments = AppState.comments
    let content = ''
    // @ts-ignore
    comments.forEach(comment => content += comment.currentCommentsTemplate)
    setHTML('currentComments', content)
}


export class CommentsController {

    constructor() {
        AppState.on('activeVegetable', this.getCommentsByPostId)
        AppState.on('comments', _drawComments)
    }


    async getCommentsByPostId() {
        try {
            await commentsService.getCommentsByPostId()
        } catch (error) {
            console.error(error)
            Pop.error(error)
        }
    }



    // async createComment(event) {
    //     try {
    //         event.preventDefault()
    //         const form = event.target
    //         const commentData = getFormData(form)
    //         console.log("Comment data", commentData)
    //         await commentsService.createComment(commentData)
    //         form.reset()

    //     } catch (error) {
    //         console.error(error)
    //         Pop.error(error)
    //     }
    // }


}