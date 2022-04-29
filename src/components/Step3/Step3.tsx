import { EuiButton } from '@elastic/eui'
import { useDispatch, useSelector } from 'react-redux'
import { useData } from '../../context/Context'
import { useStateMachine } from '../../storage/littleStateMachine'
import { refreshToken, selectedAuth } from '../../store/AuthSlice'
import { setToast } from '../../store/ToastSlice'
import { useAddUserMutation, useUpdateUserMutation } from '../../store/usersAPI'
import { IInitialStateForm } from '../../types/initialStateForm'
import { Loader } from '../Loader/Loader'

export const Step3: React.FC<{
  userData: {
    isNewUser: boolean
    userId: number
  }
}> = ({ userData }) => {

  const dispatch = useDispatch()
  const { data } = useData()
  const { store } = useStateMachine<IInitialStateForm>(data, {})
  const { uid } = useSelector(selectedAuth)
  const [updateUser, { isLoading: isLoadingUpdateUser }] = useUpdateUserMutation()
  const [addNewUser, { isLoading: isLoadingAddUser }] = useAddUserMutation()
  const isAllFetching = isLoadingUpdateUser || isLoadingAddUser

  const onSubmit = async () => {
    console.log('data', data)
    console.log('store', store)

    if (userData.isNewUser) {
      await addNewUser({
        token: uid,
        data: store,
      })
      dispatch(
        setToast({ id: Date.now().toString(), title: 'A new user was successfully added to DB', color: 'success' })
      )
    } else {
      await updateUser({
        token: uid,
        id: userData.userId,
        data: store,
      })
      dispatch(
        setToast({ id: Date.now().toString(), title: 'The user was successfully updated in the DB', color: 'success' })
      )
    }
    dispatch(refreshToken())
  }

  return (
    <>
      {isAllFetching ? (
        <Loader />
      ) : (
        <EuiButton type="submit" onClick={onSubmit}>
          Save All
        </EuiButton>
      )}
    </>
  )
}
