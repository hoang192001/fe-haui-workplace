import React, { Fragment } from 'react'
import { Navigate } from 'react-router-dom'

const RequireAuth = (props) => {
  const accessToken = localStorage.getItem('accessToken')
  return accessToken ? <Fragment>{props.children}</Fragment> : <Navigate to={'/landing-page'} />
}

export default RequireAuth
