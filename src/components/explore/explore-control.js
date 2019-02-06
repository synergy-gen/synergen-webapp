import { connect } from 'react-redux';
import ExploreView from './explore-view';
import { queryGoals } from '../../actions';

const mapStateToProps = state => ({
    goals: state.explore.results
});

const mapDispatchToProps = dispatch => ({
    searchForGoals: query => dispatch(queryGoals(query))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ExploreView);
