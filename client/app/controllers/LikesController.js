import { AppState } from "../AppState.js"
import { likesService } from "../services/LikesService.js"
import { Pop } from "../utils/Pop.js"
import { setHTML } from "../utils/Writer.js"

// function _drawPostLikers() {
//     let likes = AppState.likes
//     let content = ''
//     likes.forEach(veggie => content += veggie.heartTemplate)
//     setHTML('likes', likes)
// }

export class LikesController {
    constructor() {
        console.log("Likes Controller loaded")
        // AppState.on('likes', _drawPostLikers)
        AppState.on("activeVegetable", this.checkIfLike)
    }

    async getLikesByPostId(vegetableId) {
        try {
            await likesService.getLikesByPostId(vegetableId)
        } catch (error) {
            console.error(error)
            Pop.error(`You can't like a post twice`)
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

    // findLikedPosts() {
    //     let likes = AppState.likes
    //     let myLikes = []
    //     likes.forEach(like => {
    //         if (like.creator.id == AppState.account.id) {
    //             console.log(like)
    //         }
    //     })
    // }

    checkIfLike(activeVegetable) {
        if (!activeVegetable) {
            return
        }
        console.log(activeVegetable)
        let likes = AppState.likes
        // likes.forEach(like => {
        //     if (like.creator.id == AppState.account.id) {
        //         console.log(like)
        //     })
        // if (activeVegetable.like.creatorId == AppState.account.id) {
        //     console.log("You like this post")
        // }

    }

}