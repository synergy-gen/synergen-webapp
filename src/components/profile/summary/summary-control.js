import { connect } from 'react-redux';
import SummaryView from './summary-view';

const mapStateToProps = state => ({
    data: state.profile.goals
});

export default connect(
    mapStateToProps,
    null
)(SummaryView);
