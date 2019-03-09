import { connect } from 'react-redux';
import SettingsView from './settings-view';

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(
    mapStateToProps,
    null
)(SettingsView);
