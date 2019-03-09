import { connect } from 'react-redux';
import InformationSettingsView from './information-view';
import { updateUserInfo } from '../../actions/profile';

const mapStateToProps = state => ({
    profile: state.profile
});

const mapDispatchToProps = dispatch => ({
    onSave: settings => dispatch(updateUserInfo(settings))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InformationSettingsView);
