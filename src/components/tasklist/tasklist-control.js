import { connect } from 'react-redux';
import TasklistView from './tasklist-view';

const mapStateToProps = state => ({
    goals: state.profile.goals ? Array.from(Object.values(state.profile.goals)) : []
});

export default connect(
    mapStateToProps,
    null
)(TasklistView);
