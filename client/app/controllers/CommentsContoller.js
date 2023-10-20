import { commentsService } from "../services/CommentsService.js"
import { getFormData } from "../utils/FormHandler.js"
import { Pop } from "../utils/Pop.js"

export class CommentsController {

    constructor() {
        // this.getCommentsById()
    }


    // async getCommentsById() {
    //     try {
    //         await commentsService.getCommentsById()
    //     } catch (error) {
    //         console.error(error)
    //         Pop.error(error)
    //     }
    // }



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