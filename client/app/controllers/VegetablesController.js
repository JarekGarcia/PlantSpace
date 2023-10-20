import { AppState } from "../AppState.js"
import { vegetablesService } from "../services/VegetablesService.js"
import { getFormData } from "../utils/FormHandler.js"
import { Pop } from "../utils/Pop.js"
import { setHTML } from "../utils/Writer.js"
import { CommentsController } from "./CommentsContoller.js"


function _drawVegetables() {
    let vegetables = AppState.vegetables
    let content = ''
    vegetables.forEach(veggie => content += veggie.postTemplate)
    setHTML('postCard', content)
}

function _drawActiveVegetable() {
    let activeVegetable = AppState.activeVegetable
    // @ts-ignore
    setHTML("vegetableDetails", activeVegetable.activeVegetableTemplate)
    console.log(activeVegetable, 'draw function active vegatable in controller');
    // @ts-ignore
    bootstrap.Modal.getOrCreateInstance('#VegetableDetailsModal').show()
}

export class VegetablesController {
    constructor() {

        this.getVegetables()
        AppState.on('vegetables', _drawVegetables)
        AppState.on('account', _drawVegetables)
        AppState.on("activeVegetable", _drawActiveVegetable)
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
            // @ts-ignore
            bootstrap.Modal.getOrCreateInstance('#vegetableFormModal').hide()
            Pop.success('New vegetable succesfully created!')
        } catch (error) {
            console.error(error)
            Pop.error(error)
        }

    }

    async removeVegetable(veggieId) {
        try {
            const wantsToDelete = await Pop.confirm('Are you sure you want to delete?')
            if (!wantsToDelete) {
                return
            }
            await vegetablesService.removeVegetable(veggieId)
        } catch (error) {
            console.error(error);
            Pop.error(error)
        }
    }

    setActiveVegetable(vegetableId) {
        try {
            vegetablesService.setActiveVegetable(vegetableId)
        } catch (error) {
            Pop.error(error)
            console.error(error);
        }
    }
}