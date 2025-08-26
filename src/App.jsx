import React from 'react'
import { Routes } from 'react-router'
import { Route } from 'react-router-dom'
import Dashboard  from  "./admin/dashboard"
import Edashboard from './employee/edashboard' 


const App = () => {
  return (
    <Routes>
     <Route path="/" element={<Dashboard/>}/>
     <Route path="/edashboard" element={<Edashboard/>}/>   
    </Routes>
    
  )
}

export default App