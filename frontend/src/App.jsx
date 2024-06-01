import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
const Landing = React.lazy(() => import('../components/Landing'))
const Signin = React.lazy(() => import('../components/Signin'))
const Signup = React.lazy(() => import('../components/Signup'))
const Courses = React.lazy(() => import('../components/Courses'))
const AddCourse = React.lazy(() => import('../components/AddCourse'))

function App() {

  return (
    <><RecoilRoot>
      <BrowserRouter>
        <Suspense fallback={<div>Loading..</div>}>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/courses' element={<Courses />} />
            <Route path='/addcourse' element={<AddCourse />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </RecoilRoot>
    </>
  )

}

export default App
