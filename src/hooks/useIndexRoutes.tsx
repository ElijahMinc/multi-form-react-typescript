import { useRoutes } from 'react-router-dom'
import { LogIn } from '../components/Auth/LogIn'
import { Register } from '../components/Auth/Register'
import { Loader } from '../components/Loader/Loader'
import { UserPage } from '../pages/UserPage'
import { useGetUsersQuery } from '../store/usersAPI'

export const useIndexRoutes = () => {
  const { isFetching: isFetchingUsers, data: usersData } = useGetUsersQuery(undefined)

  const routes = useRoutes([
    {
      path: '*',
      element: <LogIn />,
    },
    {
      path: '/login',
      element: isFetchingUsers ? <Loader /> : <LogIn />,
    },
    {
      path: '/register',
      element: isFetchingUsers ? <Loader /> : <Register />,
    },
    {
      path: '/login/:uid',
      element: <UserPage users={usersData} />,
    },
  ])

  return routes
}
