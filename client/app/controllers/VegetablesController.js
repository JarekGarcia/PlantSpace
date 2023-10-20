import { AppState } from "../AppState.js"
import { vegetablesService } from "../services/VegetablesService.js"
import { getFormData } from "../utils/FormHandler.js"
import { Pop } from "../utils/Pop.js"
import { setHTML } from "../utils/Writer.js"


function _drawVegetables() {
    let vegetables = AppState.vegetables
    let content = ''
    vegetables.forEach(veggie => content += veggie.postTemplate)
    setHTML('postCard', content)
}

export class VegetablesController {
    constructor() {
        console.log("Vegetables Controller Loaded")

        this.getVegetables()
        AppState.on('vegetables', _drawVegetables)
    }

    async getVegetables() {
        try {
            await vegetablesService.getVegetables()
        } catch (error) {
            console.log(error)
            Pop.error(error)
        }
    }

    async createVegetable(event) {

        try {
            event.preventDefault()
            const form = event.target
            const vegetableData = getFormData(form)
            await vegetablesService.createVegetable(vegetableData)
            form.reset()
        } catch (error) {
            console.error(error)
            Pop.error(error)
        }

    }
}