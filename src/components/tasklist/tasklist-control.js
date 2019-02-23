import { connect } from 'react-redux';
import TasklistView from './tasklist-view';

const extractTasks = goals => {
    if (goals) {
        let tasks = [];
        for(let id in goals) {
            goals[id].tasks.forEach(task => {
                tasks.push(task);
            });
        }
        return tasks;
    } else {
        return [];
    }
};

const mapStateToProps = state => ({
    tasks: extractTasks(state.profile.goals)
});

export default connect(
    mapStateToProps,
    null
)(TasklistView);
