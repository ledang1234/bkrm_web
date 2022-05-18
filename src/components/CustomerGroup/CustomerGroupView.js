import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
} from "@material-ui/core";
import React from 'react'
import TableHeader from "../TableCommon/TableHeader/TableHeader";
import useStyles from "../TableCommon/style/mainViewStyle";

const CustomerGroupView = ({ custGroups }) => {
    const classes = useStyles()
    return (<TableContainer style={{ maxHeight: '64vh', minHeight: '60vh' }}>
        <Table size={'small'} >
            <TableHeader
                classes={classes}
                color="#000"
                headerData={HeadCells}
            />
            <TableBody>
                {custGroups.map((row, index) => {
                    return (
                        <TableRow>
                            <TableCell align="left" style={{ color: '#000' }}> {row.name} </TableCell>
                            <TableCell align="left" style={{ color: '#000' }} >{row.discount}</TableCell>
                            <TableCell align="left" style={{ color: '#000' }} > {row.conditions}</TableCell>
                            <TableCell align="right" style={{ color: '#000' }} > {row.note} </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    </TableContainer>);
}

export default CustomerGroupView;

const HeadCells = [
    { id: "name", align: "left", disablePadding: false, label: "Tên nhóm" },
    { id: "discount", align: "left", disablePadding: false, label: "Giảm giá" },
    { id: "condition", align: "left", disablePadding: false, label: "Điều kiện" },
    { id: "note", align: "left", disablePadding: false, label: "Ghi chú" },
]