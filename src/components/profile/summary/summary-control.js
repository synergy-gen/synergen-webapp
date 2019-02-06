import { connect } from 'react-redux';
import SummaryView from './summary-view';

const mapStateToProps = state => ({
    data: state.user.goals
});

export default connect(mapStateToProps, null)(SummaryView);
