import { createUserWithEmailAndPassword, signInWithEmailAndPassword, Auth, UserCredential } from 'firebase/auth'
import {
  createAsyncThunk,
  createSlice,
  isPending,
  PayloadAction,
} from '@reduxjs/toolkit'
import { isRejectedAction } from '../globalTypes/reduxTypes'
import { RootState } from './store'

export interface AuthBody {
  auth: Auth
  email: string
  parol: string
}

export interface initialStateAuth extends Omit<AuthBody, 'parol' | 'auth'> {
  uid: string
  token: string
  isFetching: boolean
  error: string | null
}

export const createAccount = createAsyncThunk<UserCredential, AuthBody>(
  'createAccount',
  async (body, { dispatch, rejectWithValue }) => {
    dispatch(removeError())
    const { email, parol, auth } = body

    try {
      return await createUserWithEmailAndPassword(auth, email, parol)
    } catch (error) {
      console.log('error', error)
      return rejectWithValue(error)
    }
  }
)

export const signInIntoAccount = createAsyncThunk<UserCredential, AuthBody>(
  'signIngAccount',
  async (body, { dispatch, rejectWithValue }) => {
    dispatch(removeError())
    const { email, parol, auth } = body
    try {
      return await signInWithEmailAndPassword(auth, email, parol)
    } catch (error) {
      console.log('error', error)
      return rejectWithValue(error)
    }
  }
)

const initialState: initialStateAuth = {
  uid: '',
  email: '',
  token: '',
  isFetching: false,
  error: '',
}

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    removeError(state) {
      state.error = ''
    },
    refreshToken(state) {
      state.token = ''
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createAccount.fulfilled, (state, action: PayloadAction<UserCredential>) => {
      state.isFetching = false
      state.email = action.payload?.user?.email ?? ''
      state.uid = action.payload?.user?.uid ?? ''
      state.token = action.payload?.user?.refreshToken ?? ''
    })
    builder.addCase(signInIntoAccount.fulfilled, (state, action: PayloadAction<UserCredential>) => {
      state.isFetching = false
      state.email = action.payload?.user?.email ?? ''
      state.uid = action.payload?.user?.uid ?? ''
      state.token = action.payload?.user?.refreshToken ?? ''
    })
    builder.addMatcher(isRejectedAction, (state, action) => {
      state.error = action.error?.message || ''
      state.isFetching = false
    })
    builder.addMatcher(isPending, (state) => {
      state.error = ''
      state.isFetching = true
    })
  },
})

export const { removeError, refreshToken } = authSlice.actions

export const selectedAuth = ({ AuthReducer }: RootState) => AuthReducer

export default authSlice.reducer
