export class Vegetable {
    constructor(data) {
        this.id = data.id || data._id
        this.creatorId = data.creatorId
        this.title = data.title
        this.description = data.description
        this.imgUrl = data.imgUrl
        this.createdAt = new Date(data.createdAt)
        this.creator = data.creator
    }
}