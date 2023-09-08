import { Route, Routes } from 'react-router-dom'

import { AuthProvider } from './components/context/AuthProvider.tsx'
import {ProtectedLayout} from './components/ProtectedLayout.tsx'
import {Login} from './components/auth/Login.tsx'
import {Register} from './components/auth/Register.tsx'

import { Home } from './components/pages/Home.tsx'

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path={"/"} element={
            <ProtectedLayout>
              <Home/>
            </ProtectedLayout>
          }/>
          <Route path={"/sign_in"} element={<Login/>}/>
          <Route path={"/sign_up"} element={<Register/>}/>
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
