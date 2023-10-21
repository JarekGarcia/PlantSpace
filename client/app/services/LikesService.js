import { AppState } from "../AppState.js"
import { Like } from "../models/Like.js"
import { Vegetable } from "../models/Vegetable.js"
import { api } from "./AxiosService.js"


class LikesService {

    async getLikesByPostId(vegetableId) {
        const foundVegetable = AppState.vegetables.find(vegetable => vegetable.id == vegetableId)
        console.log(foundVegetable)
        const postId = { postId: vegetableId }

        const res = await api.post("api/PostLikers", postId)
        console.log(res.data)
        foundVegetable.likesCount++
        // console.log(foundVegetable)
        // TODO SPLICE OUT OLD VEGETABLE AND INSERT NEW ONE WITH LIKES COUNTS ++
        // const vegetableIndex = AppState.vegetables.findIndex(vegetable => vegetable.id == vegetableId)
        // AppState.vegetables.splice(vegetableIndex, 1, new Vegetable(res.data))
        console.log(AppState.vegetables)
        AppState.emit("vegetables")
    }

    async getPostLikers() {
        const res = await api.get("api/PostLikers")
        console.log(res.data)
        const newLikes = res.data.map(pojo => new Like(pojo))
        console.log(newLikes)
    }

}

export const likesService = new LikesService()