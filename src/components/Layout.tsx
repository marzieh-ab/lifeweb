import React from 'react'
import Topbar from './Topbar'
import { Stack } from '@mui/material'
import Sidebar from './Sidebar'

const Layout = ({
 children,
}: {
 children: React.ReactNode;
})=> {
  return (
   <>
   <Topbar/>
   <Stack     direction={{ xs: 'column',sm:"column",md:"row",lg:"row" }} sx={{width:"100%" ,display: { sm: "block",md:"flex",lg:"flex"}  }} >
   <Sidebar />
   {children}

   </Stack>
  </>
  
  )
}

export default Layout