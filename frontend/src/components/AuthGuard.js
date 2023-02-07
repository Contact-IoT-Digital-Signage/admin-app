import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuthState } from "../hooks/firebaseAuth";

export default function AuthGuard({children}) {
    const {isAuthenticated} = useAuthState();

    if(isAuthenticated){
        return <> {children} </>
    }else{
        return <div style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}> 
            <CircularProgress /> 
        </div>
    }
};
