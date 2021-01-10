import React from 'react';
import { Button } from 'react-bootstrap';

import { useHistory } from "react-router-dom";


export const HomeButton = ()=>{

    const history = useHistory();


    const onClickHandler = ()=>{
        history.push('/', { from: "VideoSelectScreen" });
    }

    return(
        <div>
            <div >
                <h1 >Video Convertor App</h1>
            </div>
            
            <div className="m-3">
                <Button variant="primary" size="lg"  onClick={onClickHandler} >
                    Go to Home
                </Button>
            </div>
            
        </div>
    )
}