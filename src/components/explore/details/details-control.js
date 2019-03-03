import { connect } from 'react-redux';
import DetailsView from './details-view';

const mapStateToProps = (state, { match }) => ({
    goal: state.explore.results.find(g => g.id === match.params.id)
});

export default connect(
    mapStateToProps,
    null
)(DetailsView);
