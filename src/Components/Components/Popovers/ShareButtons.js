import React from 'react'
import { Grid, Button } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SectionSubForm from '../../Forms/components/SectionSubForm'


export default function ShareButtons( props) {
    const {section, shareLink} = props;
    const emailLink = () => {
        let link = "mailto:?";
        link += "subject=Follow Classes on http://schoolistit.com";
        link += "&body=The easiest way to manage and track your schoolwork http://schoolistit.com/classrooms"+shareLink;
        return encodeURI(link);
        //link += "subject=Follow "++
        //body=Check out this site http://www.website.com."
    }

    return (
        <React.Fragment>
            <Grid container>
                <Grid item xs={3}>
                    <Button target="_blank" href={"https://www.facebook.com/sharer/sharer.php?u=http://schoolistit.com"+shareLink}>
                        <FontAwesomeIcon icon={['fab', 'facebook-square']}></FontAwesomeIcon>
                    </Button>
                </Grid>
                <Grid item xs={3}>
                    <Button href={emailLink()} target="_blank">
                        <FontAwesomeIcon icon="envelope"></FontAwesomeIcon>
                    </Button>
                </Grid>
                <Grid item xs={3}>
                    <Button>
                        <FontAwesomeIcon icon="copy"></FontAwesomeIcon>
                    </Button>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}
