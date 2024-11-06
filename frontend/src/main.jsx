import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { AuthLayout, LoginPage, RegisterPage } from './pages/auth/index.js'
import { AdminLayout, Dashboard, Products, Orders } from './pages/admin/index.js'
import { Account, Checkout, Home, Listing, UserLayout } from './pages/user/index.js'
import NotFound from './pages/not-found/NotFound.jsx'
import CheckAuth from './components/common/CheckAuth.jsx'
import UnAuthPage from './pages/unauth-page/UnAuthPage.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <CheckAuth><Home /></CheckAuth>
      },
      {
        path: "auth",
        element: <CheckAuth><AuthLayout /></CheckAuth>,
        children: [
          {
            path: "login",
            element: <LoginPage />
          },
          {
            path: "register",
            element: <RegisterPage />
          }
        ]
      },
      {
        path: "admin",
        element: <CheckAuth><AdminLayout /></CheckAuth>,
        children: [
          {
            path: 'dashboard',
            element: <Dashboard />
          },
          {
            path: "products",
            element: <Products />
          },
          {
            path: "orders",
            element: <Orders />
          },
        ]
      },
      {
        path: "user",
        element: <CheckAuth><UserLayout /></CheckAuth>,
        children: [
          {
            path: "home",
            element: <Home />
          },
          {
            path: "account",
            element: <Account />
          },
          {
            path: "listing/:category?",
            element: <Listing />
          },
          {
            path: "checkout",
            element: <Checkout />
          },

        ]
        
      },
      {
        path: "*",
        element: <NotFound />
      },
      {
        path: "unauth-page",
        element: <UnAuthPage />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
