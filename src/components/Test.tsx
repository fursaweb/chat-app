import React from 'react';

type TestProps = {
    text: string,
    numbr: number
};

const Test = ({text, numbr}: TestProps) => {

    return(
        <div>
            <h1>{text}</h1>
            <p>{numbr}</p>
        </div> 
    )
}

export default Test;