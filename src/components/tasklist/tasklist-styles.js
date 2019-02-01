export default theme => ({
    root: {
        position: 'relative'
    },
    taskTile: {
        padding: 6,
        margin: 5,
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        alignItems: 'center'
    },
    taskTileText: {
        display: 'flex',
        flexDirection: 'column'
    },
    taskTileClose: {
        marginLeft: 'auto'
    },
    toolbar: {
        ...theme.mixins.toolbar
    }
});
