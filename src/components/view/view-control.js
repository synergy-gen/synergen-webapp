import { connect } from 'react-redux';
import ViewView from './view-view';

const mapStateToProps = (state, { match }) => {
    let goal = state.profile.goals[match.params.goalId];
    return {
        goal,
        userIsOwner: goal.creator === state.profile.username
    };
};

export default connect(
    mapStateToProps,
    null
)(ViewView);
