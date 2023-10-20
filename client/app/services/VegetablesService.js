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
        const newVegetable = new Vegetable(res.data)
        console.log("New vegetable", newVegetable)
        AppState.vegetables.push(newVegetable)
        AppState.emit("vegetables")
    }

    async removeVegetable(veggieId) {
        const res = await api.delete(`api/posts/${veggieId}`)
        console.log('deletedVegetable', res.data);
        const veggieIndex = AppState.vegetables.findIndex(veggie => veggie.id == veggieId)
        if (veggieIndex == -1) {
            return
        }
        AppState.vegetables.splice(veggieIndex, 1)
        AppState.emit('vegetables')
    }
    setActiveVegetable(vegetableId) {
        const foundVeggie = AppState.vegetables.find(veggie => veggie.id == vegetableId)
        if (!foundVeggie) {
            throw new Error(`No found veggie at ${vegetableId}`)
        }
        AppState.activeVegetable = foundVeggie

    }

}

export const vegetablesService = new VegetablesService()