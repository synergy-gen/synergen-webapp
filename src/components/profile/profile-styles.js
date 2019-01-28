const drawerWidth = 240;
const menuToggleBreakpoint = 'lg';

export default theme => {
    console.log(theme);
    return {
        root: {
            display: 'flex'
        },
        drawerButton: {
            [theme.breakpoints.up(menuToggleBreakpoint)]: {
                display: 'none'
            }
        },
        drawer: {
            [theme.breakpoints.up(menuToggleBreakpoint)]: {
                width: drawerWidth,
                flexShrink: 0
            }
        },
        drawerPaper: {
            width: drawerWidth
        },
        appBar: {
            marginLeft: drawerWidth,
            [theme.breakpoints.up(menuToggleBreakpoint)]: {
                display: 'none'
            }
        },
        toolbar: {
            ...theme.mixins.toolbar,
            [theme.breakpoints.up(menuToggleBreakpoint)]: {
                display: 'none'
            }
        },
        logo: {
            justifySelf: 'center',
            flexGrow: 1,
            marginLeft: 10
        },
        avatar: {
            width: 150,
            height: 150,
            margin: 10
        },
        mainContent: {
            flexGrow: 1
        },
        viewSelectContainer: {
            marginTop: 10,
            padding: 10,
            backgroundColor: theme.palette.primary.light
        },
        viewSelect: {
            textAlign: 'center',
            backgroundColor: 'white',
            borderRadius: theme.shape.borderRadius
        }
    };
};
