import React, {useState} from 'react'
import { Grid, Button, TextField } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SectionSubForm from '../../Forms/components/SectionSubForm'


export default function ShareButtons( props) {
    const {section, shareLink} = props;
    const [hasCopied, setHasCopied] = useState(false)
    const emailLink = () => {
        let link = "mailto:?";
        link += "subject=Follow Classes on http://schoolistit.com";
        link += "&body=The easiest way to manage and track your schoolwork http://schoolistit.com/classrooms"+shareLink;
        return encodeURI(link);
    }

    const clickShare = () => {
        const theLink = "http://schoolistit.com/classrooms"+shareLink;
        const el = document.getElementById("theLinkToCopy");
        el.select()
        document.execCommand("copy");
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
                    <Button onClick={() => clickShare()}>
                        <FontAwesomeIcon icon="copy"></FontAwesomeIcon>
                    </Button>
                    <TextField id="theLinkToCopy" defaultValue={"http://schoolistit.com"+shareLink} style={{position: "absolute", top: "-99999px", left: "-9999px", color: "#000"}}></TextField>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}
