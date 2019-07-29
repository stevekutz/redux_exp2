import React from 'react';
import {connect} from 'react-redux';
import './titleFC.css';

const TitleComponent = (props) => {
    return (
        <div className = 'titleFC_Container'>
            <h6> <span>FC Shared state</span> {props.title}</h6>
        </div>

    )
}

const mapStateToProps = state => {
    return{
        title: state.titleReducer.title
    }
}

export default connect(
    mapStateToProps
)(TitleComponent);