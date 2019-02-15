import { connect } from 'react-redux';
import TasklistView from './tasklist-view';

const extractTasks = goals => {
    if (goals && goals.length > 0) {
        let tasks = [];
        goals.forEach(goal => {
            goal.tasks.forEach(task => {
                tasks.push(task);
            });
        });
        return tasks;
    } else {
        return [];
    }
};

const mapStateToProps = state => ({
    tasks: extractTasks(state.user.goals.map(id => state.goals[id]))
});

export default connect(
    mapStateToProps,
    null
)(TasklistView);
