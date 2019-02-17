export default theme => ({
    appToolbar: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    link: {
        textDecoration: 'none'
    },
    buttonSave: {
        marginLeft: 'auto'
    },
    buttonCancel: {
        marginLeft: 'auto',
        color: theme.palette.primary.contrastText
    },
    gridRoot: {
        padding: 20
    },
    goalTitle: {
        width: '50%',
        minWidth: 300
    },
    goalDescription: {
        width: '100%'
    },
    taskSectionLabel: {
        marginBottom: 5
    },
    tasks: {
        display: 'flex',
        flexDirection: 'column',
        padding: 6
    },
    taskTextField: {
        marginBottom: 15
    },
    buttonAddTask: {
        alignSelf: 'flex-end'
    },
    tagsTextFile: {
        marginBottom: 15
    },
    tagInput: {
        display: 'flex',
        flexDirection: 'column'
    },
    tagsChipContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        marginBottom: 8
    },
    tagChip: {
        marginRight: 5
    },
    gridItem: {
        marginBottom: 15
    },
    pushDown: {
        marginBottom: 15
    }
});
