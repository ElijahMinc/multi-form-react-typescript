type I_STATE_MACHINE = '__LITTLE_STATE_MACHINE__'
const __LITTLE_STATE_MACHINE: I_STATE_MACHINE = '__LITTLE_STATE_MACHINE__'

export class LittleStateMachine {
  static getStore() {
    const store = localStorage.getItem(__LITTLE_STATE_MACHINE)
    if (store) {
      return JSON.parse(store)
    }
    return {}
  }

  static setEssence(essence: object) {
    const store = LittleStateMachine.getStore()
    localStorage.setItem(__LITTLE_STATE_MACHINE, JSON.stringify({ ...store, ...essence }))
  }
  static clearEssences(key: I_STATE_MACHINE) {
    localStorage.setItem(key, JSON.stringify({}))
  }
}

export const useStateMachine = <T extends object>(state: T, payload: any) => {
  const store = LittleStateMachine.getStore()
  const isNotEmptyStore = !!Object.keys(store).length
  if (isNotEmptyStore) {
    LittleStateMachine.setEssence(store)
  } else {
    const initStore: T = { ...state, ...payload }
    LittleStateMachine.setEssence(initStore)
  }
  return {
    action: (payload: object) => {
      LittleStateMachine.setEssence(payload)
    },
    store,
    clear: () => LittleStateMachine.clearEssences(__LITTLE_STATE_MACHINE),
  }
}
