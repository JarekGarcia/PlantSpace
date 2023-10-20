export class Vegetable {
    constructor(data) {
        this.id = data.id || data._id
        this.creatorId = data.creatorId
        this.title = data.title
        this.description = data.description
        this.imgUrl = data.imgUrl || "assets/style/leaf-removebg-preview.png"
        this.createdAt = new Date(data.createdAt)
        this.creator = data.creator
    }

    get postTemplate() {
        return `
        <div class="col-12 col-md-5 p-2 mx-md-5">
        <div class="post-card my-5">
        <div class="d-flex p-3">
          <img class="img-card rounded"
            src='${this.imgUrl}'
            alt='${this.title}'>
            <p class="fs-4">${this.title}</p>
          <p>${this.description}</p>

        </div>
        <div class="d-flex justify-content-end p-2 align-items-center">
        <img class="rounded-circle creator-picture"
        src="${this.creator.picture}"
          <p class="mb-0">${this.creator.name}</p>
          <i class="mdi mdi-heart-outline fs-3 px-3"></i>
          <p class="mb-0">10</p>
        </div>
      </div>
      </div>
      `
    }

}