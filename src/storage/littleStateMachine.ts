type I_STATE_MACHINE = '__LITTLE_STATE_MACHINE__'
const __LITTLE_STATE_MACHINE: I_STATE_MACHINE = '__LITTLE_STATE_MACHINE__'


export class LittleStateMachine {
   static getStore(key: I_STATE_MACHINE): object {
      const store = localStorage.getItem(key)
      if(store){
         return JSON.parse(store)
      }
      return {}
   }

  static setEssence(key: I_STATE_MACHINE, essence: object){
      const store = LittleStateMachine.getStore(key)
      localStorage.setItem(key, JSON.stringify({...store, ...essence }))
   }
   static clearEssences(key: I_STATE_MACHINE){
      localStorage.setItem(key, JSON.stringify({}))
   }
}



export const useStateMachine = <T extends object>(state: T, payload: any) => {
   const initStore: T = {...state, ...payload}
   LittleStateMachine.setEssence(__LITTLE_STATE_MACHINE, initStore)
   const store = LittleStateMachine.getStore(__LITTLE_STATE_MACHINE)
   return {
      action: (payload: any)=>{
       LittleStateMachine.setEssence(__LITTLE_STATE_MACHINE, {...initStore, ...payload})
      },
      store,
      clear: () => LittleStateMachine.clearEssences(__LITTLE_STATE_MACHINE)
   }
}

