import React from 'react';
import { Button } from 'react-bootstrap';

import { useHistory } from "react-router-dom";


export const EntryScreen = ()=>{

    const history = useHistory();


    const onClickHandler = ()=>{
        history.push('/emptyFolderSelect', { from: "EntryScreen" });
    }

    return(
        <div>
            <div className="m-5">
                <h1 >Video Convertor App</h1>
            </div>
            
            <div className="m-5">
                <Button variant="primary" size="md" block onClick={onClickHandler} >
                    Add New Project
                </Button>
            </div>
            
        </div>
    )
}