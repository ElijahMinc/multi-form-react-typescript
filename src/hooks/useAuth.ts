import { useSelector } from "react-redux"
import { selectedAuth } from "../store/AuthSlice"

export const useAuth = () => {
  const {email, token, uid} = useSelector(selectedAuth)

  return {
    isAuth: !!token,
    email,
    uid
  }
}