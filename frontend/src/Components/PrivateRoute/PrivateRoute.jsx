import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom'
import { getToken, removeUser } from '../../redux/slices/User';

const PrivateRoute = () => {

    const dispatch = useDispatch();
    const token = useSelector(getToken);

    useEffect(() => {
        if (!token) {
            dispatch(removeUser());
        }
    }, [token, dispatch]);

    if(!token) {
        return <Navigate to={'/login'} replace />
    }
    return <Outlet/>
}

export default PrivateRoute