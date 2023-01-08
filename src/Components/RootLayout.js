import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div>
<h1 className='text-primary h2 text-center mt-4'><strong className='text-warning'><u>TanStack Query v4</u></strong>
 &nbsp;Powerful asynchronous state management for TS/JS, React</h1>  <br/>
<ul style={{ marginLeft: "5px" }}>
    <li style={{ fontWeight: "bold", fontSize: "23px" }}>
      <NavLink to={`/`}>Home</NavLink>
    </li>
    <li style={{ fontWeight: "bold", fontSize: "23px" }}>
      <NavLink to={`/blog`}>Blog</NavLink>
    </li>
    <li style={{ fontWeight: "bold", fontSize: "23px" }}>
      <NavLink to={`/community`}>Community</NavLink>
    </li>

    <li style={{ fontWeight: "bold", fontSize: "23px" }}>
      <NavLink to={`/user-details`}> User Details</NavLink>
    </li>
    <li style={{ fontWeight: "bold", fontSize: "23px" }}>
      <NavLink to={`/data-signup`}> User signup</NavLink>
    </li>
    <li style={{ fontWeight: "bold", fontSize: "23px" }}>
      <NavLink to={`/product-services`}> ProductServices</NavLink>
    </li>
  </ul>
  <hr className="bg-danger" style={{ height: "3px" }} />
  <main><Outlet /></main>

</div>
  )
}

export default RootLayout