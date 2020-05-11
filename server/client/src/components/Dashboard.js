import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SurveyList from './surveys/SurveyList';

class Dahsboard extends Component {
    render() {
        return (
            <div>
                <SurveyList />
                <div className="fixed-action-btn toolbar btn-floating btn-large red">
                    <Link to="/surveys/new">
                        <i className="material-icons"> add </i>
                    </Link>
                </div>
            </div>

        );
    }
}

export default Dahsboard;