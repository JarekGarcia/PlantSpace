import { AppState } from "../AppState.js"


export class Like {
    constructor(data) {
        this.id = data.id || data._id
        this.creator = data.creator
    }

    get heartTemplate() {
        if (AppState.account?.id == this.creator.id) {
            return `
          <i onclick="app.LikesController.getLikesByPostId('${this.id}')" role="button" class="mdi mdi-heart fs-3 px-3"></i>
        `
        }
        return `<i onclick="app.LikesController.getLikesByPostId('${this.id}')" role="button" class="mdi mdi-heart-outline fs-3 px-3"></i>`
    }
}