export default theme => ({
    searchContainer: {
        backgroundColor: theme.palette.primary.light,
        paddingTop: 20,
        paddingBottom: 20
    },
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.up('sm')]: {
            width: 500
        }
    },
    input: {
        marginLeft: 8,
        flex: 1
    },
    iconButton: {
        padding: 10
    },
    goalTile: {
        margin: 10
    },
    buttonAdoptGoal: {
        marginLeft: 'auto'
    }
});
