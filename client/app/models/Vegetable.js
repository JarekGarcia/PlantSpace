import { AppState } from "../AppState.js"


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
        <div class="post-card my-5" role="button" title="Select this post" onclick="app.VegetablesController.setActiveVegetable('${this.id}')">
        <div class="d-flex p-3">
          <img class="img-card rounded"
            src='${this.imgUrl}'
            alt='${this.title}'>
            <p class="fs-4 p-3">${this.title}</p>
          <p>${this.description}</p>
        </div>
        <div class="d-flex justify-content-end me-3">
        <button class="btn btn-info" data-bs-toggle='modal' data-bs-target='#commentFormModal'>Comment</button>
        </div>
        <div class="d-flex justify-content-end p-2 align-items-center">
        <img class="rounded-circle creator-picture p-1"
        src="${this.creator.picture}"
          <p class="mb-0 p-1">${this.creator.name}</p>
          <i class="mdi mdi-heart-outline fs-3 px-3"></i>
          <p class="mb-0 p-3">10</p>
          <p>${this.createDeleteButton}</p>
        </div>
        
      </div>
      </div>
      `
    }

    get createDeleteButton() {
        if (AppState.account?.id == this.creatorId) {
            return `
    <button class="btn btn-danger rounded-pill p-1 fs-5" onclick="app.VegetablesController.removeVegetable('${this.id}')">Delete</button>
    `
        }
        return ''
    }

    get activeVegetableTemplate() {
        return `
        <div class="post-card my-5">
        <div class="d-flex p-3">
          <img class="img-card rounded"
            src='${this.imgUrl}'
            alt='${this.title}'>
            <p class="fs-4 p-3">${this.title}</p>
          <p>${this.description}</p>
        </div>
        <div class="d-flex justify-content-end me-3">
        <button class="btn btn-info" data-bs-toggle='modal' data-bs-target='#commentFormModal'>Comment</button>
        </div>
        <div class="d-flex justify-content-end p-2 align-items-center">
        <img class="rounded-circle creator-picture p-1"
        src="${this.creator.picture}"
          <p class="mb-0 p-1">${this.creator.name}</p>
          <i class="mdi mdi-heart-outline fs-3 px-3"></i>
          <p class="mb-0 p-3">10</p>
          <p>${this.createDeleteButton}</p>
        </div> 
      </div>
        `
    }

}



// {/* <img class="img-card rounded"
// src='${this.imgUrl}'
// alt='${this.title}'>
// <p class="fs-4 p-3">${this.title}</p>
// <p>${this.description}</p>
// </div>
// <div class="d-flex justify-content-end me-3">
// <button class="btn btn-info" data-bs-toggle='modal' data-bs-target='#commentFormModal'>Comment</button>
// </div>
// <div class="d-flex justify-content-end p-2 align-items-center">
// <img class="rounded-circle creator-picture p-1"
// src="${this.creator.picture}"
// <p class="mb-0 p-1">${this.creator.name}</p>
// <i class="mdi mdi-heart-outline fs-3 px-3"></i>
// <p class="mb-0 p-3">10</p>
// <p>${this.createDeleteButton}</p> */}