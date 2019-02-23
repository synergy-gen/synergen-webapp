import { connect } from 'react-redux';
import { createGoal, publishGoal } from '../../actions';
import CreateGoalView from './create-goal-view';
import { withRouter } from 'react-router-dom';

const mapDispatchToProps = (dispatch, ownProps) => ({
    onCreateGoal: (goal, shouldPublish) =>
        dispatch(createGoal(goal))
            .then(() => {
                if (shouldPublish) {
                    return dispatch(publishGoal(goal)).then(ownProps.history.push('/app/profile'));
                }
                ownProps.history.push('/app/profile');
            })
            .catch(console.log)
});

export default withRouter(
    connect(
        null,
        mapDispatchToProps
    )(CreateGoalView)
);
