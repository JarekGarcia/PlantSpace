import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class PostLikerService {
    async getPostLikers() {
        const liker = await dbContext.PostLikers.find().populate('creator post')
        return liker
    }
    async createPostLiker(likerData) {
        const liker = await dbContext.PostLikers.create(likerData)
        await liker.populate('creator')
        await liker.populate('post')
        return liker
    }
    async deletePostLike(likerId, userId) {
        const liker = await dbContext.PostLikers.findById(likerId).populate('creator post')
        if (!liker) {
            throw new BadRequest(`Could Not Find Like Id: ${likerId}`)
        }
        if (liker.creatorId != userId) {
            throw new Forbidden(`You didn't like this post so you can't un-like it and I don't even get how you got this message?`)
        }
        await liker.remove()
        // @ts-ignore
        return `${liker.creator.name} un-liked this post.`
    }

}

export const postLikerService = new PostLikerService()