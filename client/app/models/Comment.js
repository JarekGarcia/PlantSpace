export class Comment {
    constructor(data) {
        this.body = data.body
        this.creatorId = data.creatorId
        this.postId = data.postId
        this.createdAt = new Date(data.createdAt).toLocaleString()
        this.creatorId = data.creatorId
        this.creator = data.creator
    }


    get currentCommentsTemplate() {
        return `
        <div>
              <div class="d-flex">
                <img class="rounded-circle" src="${this.creator.picture}" alt="Creator Picture">
                <p class="p-2 mb-0 align-items-center">${this.body}</p>

              </div>
              <p>${this.createdAt}</p>
              <button onclick="app.CommentsController.removeComment('${this.id}')">Delete</button>
            </div>
        `
    }

}