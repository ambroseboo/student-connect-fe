export default function themeData (darkMode) {
    const theme = {
        palette: {
            background: {
                paper: darkMode ? '#4d4d4d' : '#ffffff',
                default: darkMode ? '#555555' : '#f2f2f2'
            },
            primary: {
                light: darkMode ? '#33c9dc' :'#33c9dc',
                main: darkMode ? '#444444' : '#e9ebed',
                dark: darkMode ? '#33c9dc' :'#008394',
                contrastText: '#fff'
            },
            secondary: {
                light: darkMode ? '#ffffff' : '#ff6333',
                main: darkMode ? '#ffffff' : '#2A374B',
                dark: darkMode ? '#ffffff' :'#b22a00',
                contrastText: '#fff'
            },
            tertiary: {
                light: darkMode ? '#ffffff' : '#d40015',
                main: darkMode ? '#ffffff' : '#d40015',
                dark: darkMode ? '#ffffff' :'#d40015',
                contrastText: '#d40015'
            },
            text: {
                primary: darkMode ? '#ffffff' : '#000000',
                secondary: darkMode ? '#ffffff' : '#000000'
            }
        }, 
        styles: {
            postTitle: {
                margin: '10px auto 10px auto'
            },
            postTime: {
                position: 'absolute',
                marginBottom: '0px'
            },
            posterDisplay: {
                margin: '1px 1px 50px 1px'
            },
            posterDisplayChild: {
                float: 'left',
                margin: 'auto 10px auto auto',
                verticalAlign: 'top'
            },
            posterDisplayChildTextTop: {
                marginTop: '-6px',
                marginBottom: '-7px'
            },
            forumDisplayList: {
                textTransform: 'none', 
                width: '350px'
            },
            postForum: {
                float: 'right'
            },
            imageSmall: {
                width: 30,
                height: 30,
                margin: 'auto 10px auto auto'
            },
            typography: {
                useNextVariants: true,
            },
            form: {
                textAlign: 'centre'
            },
            card: {
                display: 'flex',
                marginBottom: 20,
                position: 'relative'
            },
            media: {
                height: 200,
                width: 400,
                margin: '2%'
            },
            cardSideCol: {
                
            },
            content: {
                padding: '25px 25px 5px 25px',
                width: '90%'
            },
            image: {
                maxWidth: 600,
                /* height: 300, */
                margin: '10px auto 10px auto'
            },
            button: {
                marginTop: 20,
                position: 'relative',
                textTransform: 'none'
            },
            customError: {
                color: 'red',
                fontSize:'0.8rem'
            },
            pageTitle: {
                margin: '10px auto 10px auto'
            },
            textField: {
                margin: '10px auto 10px auto'
            },
            progress: {
                position: 'absolute',
                margin: 'auto 30px auto 50px'
            },
            list: {
                width: '200px',
            },
            listItem: {
                float: 'left',
                margin: 'auto 10px auto auto',
                verticalAlign: 'top'
            },
            forumHeader: {
                margin: 'auto auto auto 3%'
            },
            forumGrid: {
                marginLeft: 'auto'
            },
            commentTime: {
                position: 'absolute',
                marginBottom: '0px'
            },
            commenterDisplay: {
                margin: '1px 1px 40px 1px'
            },
            commenterDisplayChild: {
                float: 'left',
                margin: 'auto 10px auto auto',
                verticalAlign: 'top'
            },
            comment: {
                width: '90%',
            },
            commentList: {
                float: 'left',
                margin: '0px auto 0px auto',
                verticalAlign: 'top'
            },
            commentVotes: {
                display: 'flex',
                textAlign: 'center',
                flexDirection: 'row'
            },
            commentVotesNumber: {
                paddingTop: '5px'
            },
            submitButton: {
                position: 'relative',
                float: 'right',
                marginTop: '5%'
            },
            closeButton: {
                position: 'absolute',
                left: '90%',
                top: '3%'
            },
            commentForm: {
                width: '85%',
                position: 'relative',
                margin: '10px auto 10px auto'
            },
            commentAvatar: {
                position: 'relative',
                marginTop: '4%',
                left: '3.5%'
            },
            profileImage: {
                width: 200,
                height: 200,
                objectFit: 'cover',
                maxWidth: '100%',
                borderRadius: '50%',
                margin: '2% auto 2% auto'
            },
            profileImageWrapper: {
                textAlign: 'center',
                position: 'relative',
            },
            editImageButton: {
                position: 'absolute',
                bottom: '2%',
                right: '7%'
            },
            profileDetails: {
                textAlign: 'center',
                position: 'relative'
            },
            profile: {
                padding: '10% 0 10% 0'
            },
            marketplaceGridTile: {
                height: '500px',
                padding: '25px'
            }
        }
    }
    return theme;
};
