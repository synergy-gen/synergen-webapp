export default theme => ({
    root: {
        position: 'relative',
        overflowY: 'scroll',
        scrollbarWidth: 'none',
        '-ms-overflow-style': 'none',
        '&::-webkit-scrollbar': {
            width: 0,
            height: 0
        }
    },
    goal: {
        padding: 6,
        margin: 5,
        marginRight: 8,
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        flexDirection: 'column'
    },
    goalTitle: {
        borderBottom: '1px solid #ccc',
        fontWeight: 'bold'
    },
    toolbar: {
        ...theme.mixins.toolbar
    },
    task: {
        marginTop: 3
    },
    darkText: {
        color: theme.palette.primary.contrastText
    }
});
