import React, { useState, useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'
import Register from '../../pages/register/index'

const Views = (props: any): any => {
    const [state, setState] = useState<any>({
        redirect: false
    });

    useEffect(() => {
        if(props.history.location.pathname === '/home') {
            state.redirect = true
            setState({ ...state })
        }
    }, [])

    return (
        <>
            <Route path="/home/register" component={Register}></Route>
            { state.redirect ? (<Redirect to="/home/register"></Redirect>) : null }
        </>
    )
}

export default Views
