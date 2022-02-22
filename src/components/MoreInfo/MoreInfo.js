import React from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';

import InfoTwoToneIcon from '@material-ui/icons/InfoTwoTone';
import {Typography,Tooltip} from '@material-ui/core';

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }))(Tooltip);

const MoreInfo = () => {
    return (
        <div>
            
            <HtmlTooltip
                arrow
                title={
                <React.Fragment>
                    <Typography color="inherit">Tooltip with HTML</Typography>
                    <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
                    {"It's very engaging. Right?"}
                </React.Fragment>
                }
            >
              <InfoTwoToneIcon fontSize="small" />
            </HtmlTooltip>
        </div>
    )
}

export default MoreInfo
