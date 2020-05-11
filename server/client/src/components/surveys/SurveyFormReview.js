import _ from 'lodash';
import React, { Component } from "react";
import { connect } from 'react-redux';
import formFields from "./FormFields";
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';

class SurveyFormReview extends Component {
    render() {

        const reviewFields = _.map(formFields, ({name,label}) => {
            return(
                <div key={name}>
                    <label>{label}</label>
                    <div>
                        {this.props.formValues[name]}
                    </div>
                </div>
            );
        });
        return(
            <div>
                <h5>Please confirm your entries!</h5>
                {reviewFields}
                <button 
                className="yellow darken-3 btn-flat"
                onClick={this.props.onCancel}
                >Back</button>
                <button 
                className="green btn-flat white-text right"
                onClick={() => this.props.submitSurvey(this.props.formValues, this.props.history)}
                >Send Survey
                <i className="material-icons right">email</i>
                </button>
            </div>
        );
    }
}

function mapStateToProps(state) {
return {formValues: state.form.surveyForm.values};
}

export default connect(mapStateToProps, actions) (withRouter(SurveyFormReview));