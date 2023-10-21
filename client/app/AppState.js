import { Like } from './models/Like.js'
import { Value } from './models/Value.js'
import { Vegetable } from './models/Vegetable.js'
import { EventEmitter } from './utils/EventEmitter.js'
import { isValidProp } from './utils/IsValidProp.js'
import { loadState } from './utils/Store.js'


class ObservableAppState extends EventEmitter {
  page = ''
  user = null
  /** @type {import('./models/Account.js').Account | null} */
  // @ts-ignore
  account = null
  /** @type {import('./models/Value.js').Value[]} */
  values = loadState('values', [Value])
  socketData = []


  /**
   * @type {Vegetable[]}
   */
  vegetables = []

  /**
   * @type {Vegetable | null}
  */
  activeVegetable = null


  /**
   * @type {Comment[]}
   */
  comments = []

  /**
   * @type {Like[]}
   */
  likes = []



  // Used to load initial data
  init() {

  }
}

export const AppState = new Proxy(new ObservableAppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})