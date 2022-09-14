import { store } from '../../app/store'
import { proteinApiSlice } from '../protein/proteinApiSlice'
// import { usersApiSlice } from '../users/usersApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
    useEffect(() => {
        console.log('subscribing')
        const protein = store.dispatch(proteinApiSlice.endpoints.getProtein.initiate())
        // const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())

        return () => {
            console.log('unsubscribing')
            protein.unsubscribe()
            // users.unsubscribe()
        }
    }, [])

    return <Outlet />
}
export default Prefetch
