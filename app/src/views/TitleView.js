import React from 'react';
import {connect} from 'react-redux';
import '../App.css';
import TitleFC from '../components/TitleFC';


class TitleView extends React.Component {
    state = {
        defaultState: 'default State'
    }

    render() {
        return (
            <div className = "titleViewContainer">
                <h6> <span>View: Shared state</span> {this.props.title}</h6> 
                <TitleFC titleprop = {this.props.title}/>         
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        title: state.titleReducer.title
    };
};

export default connect(
    mapStateToProps
)(TitleView);