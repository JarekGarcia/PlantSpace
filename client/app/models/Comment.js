import { AppState } from "../AppState.js"


export class Comment {
    constructor(data) {
        this.id = data.id || data._id
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
              <div class="d-flex align-items-center justify-content-around">
              <p>${this.createdAt}</p>
              ${this.createDeleteButton}
              </div>
            </div>
        `
    }

    get createDeleteButton() {
        if (AppState.account?.id == this.creatorId) {
            return `
            <button class="btn btn-danger rounded p-1 fs-4" onclick="app.CommentsController.removeComment('${this.id}')">
            <i class="mdi mdi-delete"></i>
            </button>
            `
        }
        return ``
    }

}