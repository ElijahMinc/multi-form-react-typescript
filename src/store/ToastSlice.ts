import { RootState } from "./store";
import { Toast } from "@elastic/eui/src/components/toast/global_toast_list";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EuiToastProps } from "@elastic/eui/src/components/toast/toast";

export interface initialStateToast {
   toast: Toast[]
 }

export interface SetToast extends EuiToastProps{
    title: string
    color: EuiToastProps['color']
 }

const initialState: initialStateToast = {
  toast: []
}

export const toastSlice = createSlice({
  name: 'toastSlice',
  initialState,
  reducers: {
    setToast: (state, action: PayloadAction<SetToast>) => {
      state.toast.push({
        id: action.payload.id ?? '',
        title: action.payload.title,
        color: action.payload.color,
      })
    },
    removeToast: (state) => {
      state.toast = []
    }
  },
})

export const selectedToast = ({ToastReducer}: RootState) => ToastReducer

export const { removeToast, setToast } = toastSlice.actions

export default toastSlice.reducer