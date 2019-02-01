export default theme => {
    console.log(theme);
    return {
        avatar: {
            width: 150,
            height: 150
        },
        viewSelectContainer: {
            marginTop: 10,
            padding: 10,
            backgroundColor: theme.palette.primary.light
        },
        viewSelect: {
            textAlign: 'center',
            borderRadius: theme.shape.borderRadius
        },
        selectInput: {
            color: theme.palette.primary.contrastText
        },
        link: {
            textDecoration: 'none'
        }
    };
};
