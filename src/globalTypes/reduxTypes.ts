import { Action, AnyAction } from "@reduxjs/toolkit";

export interface RejectedAction extends Action {
   error: Error
}


export const isRejectedAction = (action: AnyAction): action is RejectedAction => {
  return action.type.endsWith('rejected')
}
