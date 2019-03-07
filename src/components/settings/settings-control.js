import { connect } from 'react-redux';
import SettingsView from './settings-view';

const mapStateToProps = state => ({
    profileUserName: state.profile.name
})

export default connect(
    mapStateToProps,
    null
)(SettingsView);
