import { connect } from 'react-redux';
import CreateView from './create-view';
import { createGoal } from '../../actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => ({
    userId: state.user.id
});

const mapDispatchToProps = dispatch => ({
    onCreateGoal: goal => dispatch(createGoal(goal))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateView);
