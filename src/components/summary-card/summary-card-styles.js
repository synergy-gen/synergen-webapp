export default theme => ({
    summaryCardGrid: {
        margin: 10,
        maxHeight: 292,
        maxWidth: 330
    },
    summaryCard: {
        height: '100%'
    },
    summaryCardHeader: {
        padding: '5px 15px 5px 15px'
    },
    summaryCardContent: {
        padding: '5px 15px 5px 15px'
    },
    summaryCardDescription: {
        ...theme.typography.body2,
        display: 'block',
        display: '-webkit-box',
        maxWidth: '100%',
        height: 1 * 1.4 * 3 + 'rem',
        margin: '0 auto',
        '-webkit-line-clamp': 3,
        '-webkit-box-orient': 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    link: {
        textDecoration: 'none'
    }
});
