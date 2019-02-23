import { connect } from 'react-redux';
import { createGoal, publishGoal } from '../../actions/goals';
import CreateGoalView from './create-goal-view';
import { withRouter } from 'react-router-dom';

const mapDispatchToProps = (dispatch, ownProps) => ({
    onCreateGoal: (goal, shouldPublish) =>
        dispatch(createGoal(goal)).then(
            () => {
                if (shouldPublish) {
                    return dispatch(publishGoal(goal)).then(() => {
                        ownProps.history.push('/app/profile');
                    });
                }
                ownProps.history.push('/app/profile');
            },
            err => {
                console.log(err);
            }
        )
});

export default withRouter(
    connect(
        null,
        mapDispatchToProps
    )(CreateGoalView)
);
