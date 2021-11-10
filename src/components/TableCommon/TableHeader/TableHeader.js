import React from 'react'
import PropTypes from 'prop-types';
import {useTheme,withStyles} from "@material-ui/core/styles";

// import library
import {TableHead,TableRow,TableCell,TableSortLabel} from '@material-ui/core';
import { grey} from '@material-ui/core/colors'



const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.customization.mode === "Light"? null: grey[800],
      color: theme.customization.mode === "Light"? null: grey[500],
    },
    
}))(TableCell);

  
function TableHeader(props) {
    const theme = useTheme();
    const { classes, order, orderBy, onRequestSort,headerData,isCart } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
    
    return (
      <TableHead className={classes.headColor}>
        <TableRow>
            {headerData.map((headCell) => (
            <StyledTableCell
                key={headCell.id}
                align={headCell.align}
                sortDirection={orderBy === headCell.id ? order : false}
            >
                <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
                style={{color:theme.themeText}}
                >
                {headCell.label}
                {orderBy === headCell.id ? (
                    <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                ) : null}
                </TableSortLabel>
            </StyledTableCell>
           
            ))}
             {isCart?  <StyledTableCell/>: null}
            
        </TableRow>
      </TableHead>
        );
    }


export default TableHeader