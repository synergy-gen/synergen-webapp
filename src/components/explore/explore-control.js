import { connect } from 'react-redux';
import ExploreView from './explore-view';
import { queryGoals } from '../../actions/explore';
import { withRouter } from 'react-router-dom';

const mapDispatchToProps = (dispatch, ownProps) => ({
    searchForGoals: query => dispatch(queryGoals(query)).then(ownProps.history.push(`/app/explore`))
});

export default connect(
    null,
    mapDispatchToProps
)(withRouter(ExploreView));
