export default theme => ({
    root: {
        position: 'relative'
    },
    taskTile: {
        padding: 6,
        margin: 5,
        marginRight: 8,
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        alignItems: 'center'
    },
    darkText: {
        color: theme.palette.primary.contrastText
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
    },
    chip: {
        margin: 4,
        display: 'flex',
        justifyContent: 'space-between'
    }
});
