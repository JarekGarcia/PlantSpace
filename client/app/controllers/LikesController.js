import { AppState } from "../AppState.js"
import { likesService } from "../services/LikesService.js"
import { Pop } from "../utils/Pop.js"
import { setHTML } from "../utils/Writer.js"

function _drawPostLikers() {
    let likes = AppState.likes
    setHTML('likes', likes)
}

export class LikesController {
    constructor() {
        console.log("Likes Controller loaded")
        AppState.on('likes', _drawPostLikers)
    }

    async getLikesByPostId(vegetableId) {
        try {
            await likesService.getLikesByPostId(vegetableId)
        } catch (error) {
            console.error(error)
            Pop.error(error)
        }
    }

    async getPostLikers() {
        try {
            await likesService.getPostLikers()
        } catch (error) {
            console.error(error)
            Pop.error(error)
        }
    }

}