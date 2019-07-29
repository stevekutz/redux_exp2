import React from 'react';
import './titleFC.css';


const TitleFC = (props) => {
    console.log('props in TitleFC >> ', props);
    return (
        <div className = 'titleFC_Container'>
            <h6> <span> FC state passed in as props </span> {props.titleprop}</h6>   
        </div>
    )
}

export default TitleFC;