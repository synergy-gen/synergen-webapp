import { connect} from 'react-redux';
import ViewView from './view-view';

const mapStateToProps = state => ({
    goals: state.profile.goals
});

export default connect(mapStateToProps, null)(ViewView);