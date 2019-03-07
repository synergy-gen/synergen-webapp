import { connect } from 'react-redux';
import AvatarSettingsView from './avatar-view';
import { uploadAvatar } from '../../actions/profile';

const mapStateToProps = state => ({
    src: state.profile._links.avatar
});

const mapDispatchToProps = dispatch => ({
    onNewAvatar: (rawData, type) =>
        dispatch(uploadAvatar(rawData, type)).then(
            () => {},
            err => {
                console.log(err);
            }
        )
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AvatarSettingsView);
