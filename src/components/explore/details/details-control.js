import { connect } from 'react-redux';
import DetailsView from './details-view';
import { withRouter } from 'react-router';
import { adoptGoal } from '../../../actions/goals';

const mapStateToProps = (state, { match }) => ({
    goal: state.explore.results.find(g => g.id === match.params.id)
});

const mapDispatchToProps = (dispatch, { match, history }) => ({
    onAdopt: () =>
        dispatch(adoptGoal(match.params.id)).then(
            () => {
                history.push('/app/explore');
            },
            err => {
                console.log(err);
            }
        )
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(DetailsView));
