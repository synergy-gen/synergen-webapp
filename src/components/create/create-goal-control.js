import { connect } from 'react-redux';
import { createGoal } from '../../actions';
import CreateGoalView from './create-goal-view';
import { withRouter } from 'react-router-dom';

const mapDispatchToProps = (dispatch, ownProps) => ({
    onCreateGoal: goal =>
        dispatch(createGoal(goal))
            .then(ownProps.history.push('/app/profile'))
            .catch(console.log)
});

export default withRouter(
    connect(
        null,
        mapDispatchToProps
    )(CreateGoalView)
);
