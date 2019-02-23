import { connect } from 'react-redux';
import ExploreView from './explore-view';
import { queryGoals } from '../../actions/explore';

const mapStateToProps = state => ({
    results: state.explore.results
});

const mapDispatchToProps = dispatch => ({
    searchForGoals: query => dispatch(queryGoals(query))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ExploreView);
