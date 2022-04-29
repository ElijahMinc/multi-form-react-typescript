import { EuiBottomBar, EuiButton, EuiFlexGroup, EuiFlexItem, EuiText, EuiTitle } from '@elastic/eui'
import { UserCredential } from '@firebase/auth'
import { PrepareAction } from '@reduxjs/toolkit'
import {  useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebase'
import { createAccount, selectedAuth } from '../../store/AuthSlice'
import { useAppDispatch } from '../../store/store'
import { setToast } from '../../store/ToastSlice'
import Step1 from '../Step1'

export const Register = () => {
  const { uid } = useSelector(selectedAuth)
  const [isFetching, setFetching] = useState(false)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const getEmailAndPassword = async (email: string, parol: string) => {
    setFetching(true)
    const infoUser = {
      auth,
      email,
      parol,
    }
    const response = (await dispatch(createAccount(infoUser))) as ReturnType<PrepareAction<UserCredential>>
    setFetching(false)

    if ('error' in response) {
      dispatch(setToast({ id: Date.now().toString(), title: response?.error?.message ?? '', color: 'danger' }))
      return
    }
    dispatch(setToast({ id: Date.now().toString(), title: `Welcome ${email}`, color: 'success' }))
    navigate(`/login/${uid}`)
  }

  return (
    <>
      <EuiFlexGroup alignItems="center">
        <EuiFlexItem grow={true}>
          <div style={{ width: '100%' }}>
            <EuiTitle className="mt-20" textTransform="uppercase">
              <EuiText textAlign="center">Create Account</EuiText>
            </EuiTitle>
            <Step1
              withRoute={false}
              withTitle={false}
              isCreateNewUser={true}
              isLoginOrRegister={true}
              getEmailAndPassword={getEmailAndPassword}
              isFetching={isFetching}
            />
          </div>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiBottomBar>
        <EuiFlexGroup>
          <EuiFlexItem grow={1}>
            <EuiButton color="ghost" size="m" iconType="user" onClick={() => navigate('/login')}>
              Sign in
            </EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiBottomBar>
    </>
  )
}
