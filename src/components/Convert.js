import React from 'react';
import { Button } from 'react-bootstrap';


export const Convert = ({onConvertClick})=>{

    // const onClickHandler = ()=>{
        
    // }

    return(
        <Button variant="primary" size="lg" block onClick={onConvertClick}>
            Convert
        </Button>
    )
}