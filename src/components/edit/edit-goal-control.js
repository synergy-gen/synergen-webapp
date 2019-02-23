import { connect } from 'react-redux';
import EditGoalView from './edit-goal-view';
import { editGoal, deleteGoal } from '../../actions/goals';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => ({
    goal: state.profile.goals[ownProps.match.params.entityId]
});

const mapDispatchToProps = (dispatch, props) => ({
    onSaveGoalEdits: (id, goal) =>
        dispatch(editGoal(goal)).then(
            () => {
                props.history.push('/app/view/' + id);
            },
            err => console.log(err)
        ),
    onDeleteGoal: goal =>
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
    )(EditGoalView)
);
