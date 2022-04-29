import { useEffect, useMemo } from 'react'
import { Navigate } from 'react-router-dom'
import { MultyForm } from '../components/MultyForm'
import { useData } from '../context/Context'
import { useAuth } from '../hooks/useAuth'
import { IUsersAPI } from '../types/usersAPItypes'

interface UserPageProps {
  users?: IUsersAPI[]
}

export const UserPage: React.FC<UserPageProps> = ({ users }) => {
  const { changeData } = useData()
  const { isAuth, uid } = useAuth()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const currentUser = useMemo(() => users?.filter((user) => user.token.includes(uid)) || [], [])

  const userData = {
    isNewUser: !currentUser.length,
    userId: currentUser[0]?.id,
  }

  const isNotLoginUser = !isAuth

  useEffect(() => {
    changeData(currentUser?.[0]?.data || {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log('isNotLoginUser', isNotLoginUser)
  if (isNotLoginUser) {
    console.log('render')
    return <Navigate to={'/login'} />
  }

  return <MultyForm userData={userData} />
}
