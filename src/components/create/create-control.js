import { connect } from 'react-redux';
import CreateView from './create-view';
import { createGoal } from '../../actions';

const mapDispatchToProps = dispatch => ({
    onCreateGoal: goal => dispatch(createGoal(goal))
});

export default connect(null, mapDispatchToProps)(CreateView);
