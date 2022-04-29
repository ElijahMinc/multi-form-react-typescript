import { EuiBottomBar, EuiButton, EuiFlexGroup, EuiFlexItem, EuiText, EuiTitle } from '@elastic/eui'
import { UserCredential } from '@firebase/auth'
import { PrepareAction } from '@reduxjs/toolkit'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { auth } from '../../firebase'
import { useAuth } from '../../hooks/useAuth'
import { selectedAuth, signInIntoAccount } from '../../store/AuthSlice'
import { useAppDispatch } from '../../store/store'
import { setToast } from '../../store/ToastSlice'
import { useGetUsersQuery } from '../../store/usersAPI'
import { List } from '../common/List/List'
import { Modal } from '../common/Modal/Modal'
import Step1 from '../Step1'

export const LogIn: React.FC = () => {
  const { data: usersData, isFetching: isFetchingUsers } = useGetUsersQuery(undefined)
  const [isVisibleModal, setVisibleModal] = useState(false)
  const { isAuth } = useAuth()
  const [isFetching, setFetching] = useState(false)
  const dispatch = useAppDispatch()
  const { uid } = useSelector(selectedAuth)

  const onCloseModal = () => setVisibleModal(false)

  const navigate = useNavigate()
  const getEmailAndPassword = async (email: string, parol: string) => {
    setFetching(true)
    const infoUser = {
      auth,
      email,
      parol,
    }
    const response = (await dispatch(signInIntoAccount(infoUser))) as ReturnType<PrepareAction<UserCredential>>

    setFetching(false)
    if ('error' in response) {
      dispatch(setToast({ id: Date.now().toString(), title: response?.error?.message ?? '', color: 'danger' }))
      return
    }
    dispatch(setToast({ id: Date.now().toString(), title: `Welcome ${email}`, color: 'success' }))
    navigate(`/login/${uid}`)
  }
  console.log('isAuth', isAuth)
  return (
    <>
      {isAuth ? (
        <Navigate to={`/login/${uid}`} />
      ) : (
        <div style={{ width: '100%', height: '100%' }}>
          <EuiTitle className="mt-20" textTransform="uppercase">
            <EuiText textAlign="center">Login</EuiText>
          </EuiTitle>
          <Step1
            isFetching={isFetching}
            withRoute={false}
            withTitle={false}
            isLoginOrRegister={true}
            isCreateNewUser={true}
            getEmailAndPassword={getEmailAndPassword}
          />
          <EuiBottomBar>
            <EuiFlexGroup>
              <EuiFlexItem grow={1}>
                <EuiButton
                  isLoading={isFetching}
                  color="ghost"
                  size="m"
                  iconType="user"
                  onClick={() => navigate('/register')}>
                  Add user
                </EuiButton>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiButton isLoading={isFetchingUsers} onClick={() => setVisibleModal(true)}>
                  Show Modal
                </EuiButton>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiBottomBar>
        </div>
      )}
      {isVisibleModal && !isFetchingUsers && (
        <Modal onCloseModal={onCloseModal}>
          <List list={usersData!} />
        </Modal>
      )}
    </>
  )
}
