import ProfileView from './profile-view';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        user: state.profile,
        avatar: state.profile._links
            ? state.profile._links.avatar || '/assets/img/no-avatar.png'
            : '/assets/img/no-avatar.png'
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileView);
