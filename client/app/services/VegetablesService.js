import { Vegetable } from "../models/Vegetable.js"
import { api } from "./AxiosService.js"
import { AppState } from "../AppState.js"

class VegetablesService {

    async getVegetables() {
        let res = await api.get("api/posts")
        // console.log("Got posts", res.data)
        const newVegetables = res.data.map(pojo => new Vegetable(pojo))
        AppState.vegetables = newVegetables
    }

    async createVegetable(vegetableData) {
        const res = await api.post("api/posts", vegetableData)
        console.log("Created vegetable", vegetableData)
        debugger
        const newVegetable = new Vegetable(res.data)
        console.log("New vegetable", newVegetable)
        AppState.vegetables.push(newVegetable)
        AppState.emit("vegetables")
    }

}

export const vegetablesService = new VegetablesService()