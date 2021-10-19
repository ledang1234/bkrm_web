import React from 'react'
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import PropTypes from 'prop-types';

function TableHeader(props) {
    const { classes, order, orderBy, onRequestSort,headerData } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
    return (
      <TableHead >
        <TableRow>
            {headerData.map((headCell) => (
            <TableCell
                key={headCell.id}
                align={headCell.numeric ? 'right' : 'left'}
                sortDirection={orderBy === headCell.id ? order : false}
            >
                <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
                >
                {headCell.label}
                {orderBy === headCell.id ? (
                    <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                ) : null}
                </TableSortLabel>
            </TableCell>
            ))}
            {/* <TableCell/> */}
            
        </TableRow>
        </TableHead>
        );
    }

TableHeader.propTypes = {
classes: PropTypes.object.isRequired,
numSelected: PropTypes.number.isRequired,
onRequestSort: PropTypes.func.isRequired,
onSelectAllClick: PropTypes.func.isRequired,
order: PropTypes.oneOf(['asc', 'desc']).isRequired,
orderBy: PropTypes.string.isRequired,
rowCount: PropTypes.number.isRequired,
};

export default TableHeader