import React from 'react'
import { makeStyles, useTheme,withStyles } from "@material-ui/core/styles";
import { grey} from '@material-ui/core/colors'
import {Table,TableContainer,FormControlLabel,Switch,Paper} from '@material-ui/core';


const TableWrapper = (props) => {
    const {isCart, isReport} = props;

    const theme = useTheme();
    // const classes = useStyles(theme);
    // table
    const [dense, setDense] = React.useState(isReport?true:false);
    

    const handleChangeDense = (event) => {
      setDense(event.target.checked);
    };

    return (
    <>
        <StyledPaper style={{width: '100%', marginBottom: theme.spacing(2)}}>
            <TableContainer style={{maxHeight: '58vh',}}>
                <Table
                    aria-labelledby="tableTitle"
                    size={dense ? 'small' : 'medium'}
                    aria-label="enhanced table"
                    stickyHeader 
                >
                    {props.children}

                </Table>
            </TableContainer>
        </StyledPaper>

         {/* Add page navigation here...  */}
        {isCart ? null :<FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label="Thu nhỏ"
            style={{display: "flex",justifyContent: "flex-end",}}
        />}
    </>
    )
}

const StyledPaper = withStyles((theme) => ({
    root: {
      boxShadow:"none",
      background: theme.customization.mode === "Light"? null: grey[800],
      color: theme.customization.mode === "Light"? null: grey[700]
    },
  }))(Paper);

export default TableWrapper
