import { Navigate } from "react-router-dom"
import Summary from "../pages/Summary"
import Browse from "../pages/Browse"
import Details from "../pages/Details"
import Search from "../pages/Search"
import React from "react"

const routes = [
    {
        path: '/',
        element: <Summary />
    },
    {
        path: '/browse',
        element: <Browse />
    },
    {
        path: '/package',
        element: <Details />
    },
    {
        path: '/search',
        element: <Search />
    },
    {
        path: '*',
        element: <Navigate to="/" />
    }
]
export default routes;