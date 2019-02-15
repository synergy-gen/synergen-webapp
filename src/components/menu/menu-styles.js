export default theme => ({
    link: {
        textDecoration: 'none'
    },
    logoutIcon: {
        transform: 'rotate(180deg)'
    },
    active: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText + ' !important'
    },
    toolbar: {
        ...theme.mixins.toolbar
    }
});
