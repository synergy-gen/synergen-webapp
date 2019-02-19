export default theme => ({
    appBar: {
        color: theme.palette.primary.contrastText
    },
    toolbarButton: {
        color: theme.palette.primary.contrastText
    },
    root: {
        display: 'flex',
        flexDirection: 'column',
        padding: '10px'
    },
    paperTaskSummary: {
        marginTop: 10,
        padding: 15
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10
    },
    headerContent: {},
    headerActions: {
        marginLeft: 'auto'
    },
    link: {
        textDecoration: 'none'
    }
});
