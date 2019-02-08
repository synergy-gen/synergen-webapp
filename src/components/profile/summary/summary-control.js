import { connect } from 'react-redux';
import SummaryView from './summary-view';

const mapStateToProps = state => ({
    data: state.user.goals.map(id => state.goals[id])
});

export default connect(
    mapStateToProps,
    null
)(SummaryView);
