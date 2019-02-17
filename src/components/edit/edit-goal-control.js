import { connect } from 'react-redux';
import EditGoalView from './edit-goal-view';
import { editGoal } from '../../actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => ({
    goal: state.goals[ownProps.match.params.entityId]
});

const mapDispatchToProps = (dispatch, props) => ({
    onSaveGoalEdits: (id, goal) =>
        dispatch(editGoal(goal))
            .then(props.history.push('/app/view/' + id))
            .catch(console.log)
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(EditGoalView)
);
