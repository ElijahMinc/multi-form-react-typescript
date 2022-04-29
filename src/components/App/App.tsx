import { EuiGlobalToastList } from '@elastic/eui'
import { useDispatch, useSelector } from 'react-redux'
import { useIndexRoutes } from '../../hooks/useIndexRoutes'
import { removeToast, selectedToast } from '../../store/ToastSlice'

const App = () => {
  const { toast } = useSelector(selectedToast)

  const routes = useIndexRoutes()
  const dispatch = useDispatch()


  return (
    <>
      {routes}
      <EuiGlobalToastList
        toasts={toast}
        side="right"
        dismissToast={() => dispatch(removeToast())}
        toastLifeTimeMs={3000}
      />
    </>
  )
}

export default App
