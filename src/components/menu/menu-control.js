import { connect } from 'react-redux';
import MenuView from './menu-view';
import { withRouter } from 'react-router-dom';
import { logout } from '../../actions/auth';

const mapDispatchToProps = (dispatch, ownProps) => ({
    onLogout: () => dispatch(logout()),
    onLinkSelect: ownProps.onLinkSelect
});

export default connect(
    null,
    mapDispatchToProps
)(withRouter(MenuView));
