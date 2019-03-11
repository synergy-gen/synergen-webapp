import { connect } from 'react-redux';
import ViewView from './view-view';
import { deleteGoal } from '../../actions/goals';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, { match }) => {
    let goal = state.profile.goals[match.params.goalId];
    return {
        goal,
        userIsOwner: goal && goal.creator === state.profile.username
    };
};

const mapDispatchToProps = (dispatch, props) => ({
    onDelete: goal =>
        dispatch(deleteGoal(goal)).then(
            () => {
                props.history.push('/app/profile');
            },
            err => console.log(err)
        )
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(ViewView)
);
