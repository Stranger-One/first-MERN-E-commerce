import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Toaster } from "@/components/ui/toaster"
import { useDispatch, useSelector } from 'react-redux'
import { setIsAuthenticated, setIsLoading, setUserData } from './store/authSlice'
import { checkUserAuth } from './services/authServices'

function App() {
  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.auth.isLoading)

  const checkAuth = async () => {
    const token = localStorage.getItem('token')

    const response = await checkUserAuth(token)

    if (response) {
      dispatch(setIsAuthenticated(true));
      dispatch(setUserData(response));
      dispatch(setIsLoading(false))
    } else {
      dispatch(setIsAuthenticated(false));
      dispatch(setUserData(null));
      dispatch(setIsLoading(false))
    }

  };

  useEffect(() => {
    checkAuth();
  }, [dispatch]);

  if (isLoading) return <div className="w-full h-screen flex justify-center items-center">Loading....</div>

  return (
    <>
      <div className="w-full">
        <Outlet />
        <Toaster />
      </div>
    </>
  )
}

export default App
