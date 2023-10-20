import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class PostService {
    async deletePost(postId, userId) {
        const deletedPost = await this.getPostsById(postId)
        if (userId != deletedPost.creatorId.toString()) {
            throw new Forbidden('not your post to delete!')
        }
        await deletedPost.remove()
        return `deleted post ${deletedPost.title}`
    }
    async getPosts() {
        const posts = await dbContext.Posts.find().populate('creator')
        return posts
    }
    async createPost(postData) {
        const post = await dbContext.Posts.create(postData)
        await post.populate("creator")
        return post
    }
    async getPostsById(postId) {
        const post = await (await dbContext.Posts.findById(postId)).populate('creator')
        if (!post) {
            throw new BadRequest(`Could Not Find The Post With The Id That Was Supplied: ${postId}.`)
        }
        return post
    }

}

export const postService = new PostService()