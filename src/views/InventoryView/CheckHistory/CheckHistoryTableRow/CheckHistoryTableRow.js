import React from 'react'
import useRowStyles from '../../../../components/TableCommon/style/rowStyle'
import clsx from "clsx";

import {TableCell,TableRow} from '@material-ui/core';

import {FormatedStatusCheck} from '../../../../components/TableCommon/util/format'
import CheckHistoryDetail from './CheckHistoryDetail/CheckHistoryDetail'

const CheckHistoryTableRow = (props) => {
    const { row, handleOpenRow,openRow} = props;
    const classes = useRowStyles();

    return (
        <>
        {/* ROW */}
            <TableRow
            onClick={() => handleOpenRow(row.uuid)}   
            key={row.uuid}
            className={ clsx(classes.row,(openRow === row.uuid) ? classes.rowClicked : null)}
            >
                <TableCell align="left" >{row.id}</TableCell>
                <TableCell align="left"className={classes.fontName}>{row.date}</TableCell>
                <TableCell align="left">{row.branch}</TableCell>
                <TableCell align="right" className={classes.fontName}>{row.tongtonkho}</TableCell>
                <TableCell align="right" className={classes.fontName}>{row.tongSLthucte}</TableCell>
                <TableCell align="right" className={classes.fontName}>{row.tongSLthucte - row.tongtonkho}</TableCell>
                <TableCell align="center">
                    <FormatedStatusCheck status={row.tongSLthucte - row.tongtonkho}/>
                </TableCell>
                <TableCell align="left">{row.employee}</TableCell>
            </TableRow>

        {/* DETAIL */}
            <TableRow>
              {/* colspan  => số cột trong collapse */}
              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>           
                    <CheckHistoryDetail parentProps={props}/>       
              </TableCell>
       
            </TableRow>
        </>
    )
}

export default CheckHistoryTableRow
