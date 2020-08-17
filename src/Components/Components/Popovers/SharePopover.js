import React from 'react';
import { Popover, Container } from '@material-ui/core';
import ShareButtons from './ShareButtons.js';



export default function SharePopover( { anchorEl, open, profile, object, onClose, shareLink }) {
    
    
        return (
            <Popover
                id={object}
                open={open}
                anchorEl={anchorEl}
                onClose={onClose}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
                }}
                transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
                }}
            >
                <Container>
                    <ShareButtons shareLink={shareLink} section={object}></ShareButtons>
                </Container>
            </Popover>
        )
    
}
