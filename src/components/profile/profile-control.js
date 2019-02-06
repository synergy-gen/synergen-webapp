import ProfileView from './profile-view';
import { connect } from 'react-redux';
import { setVisibleGoal } from '../../actions';

const mapStateToProps = state => {
    return {
        user: state.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGoalSelect: id => dispatch(setVisibleGoal(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);
