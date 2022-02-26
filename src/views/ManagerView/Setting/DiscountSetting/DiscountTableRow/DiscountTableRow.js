import React from 'react'
import useRowStyles from '../../../../../components/TableCommon/style/rowStyle'
import clsx from "clsx";
import { grey} from '@material-ui/core/colors'

import {TableCell,TableRow,Avatar,ListItem,Typography} from '@material-ui/core';


import {FormatedStatus} from '../../../../../components/TableCommon/util/format'
import ava from '../../../../../assets/img/product/lyimg.jpeg';
import DiscountDetail from './DiscountDetail/DiscountDetail'


const DiscountTableRow = (props) => {
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
                <TableCell align="left">MÃ</TableCell>
                <TableCell align="left">TÊN</TableCell>
                <TableCell align="left">TỪ NGÀY</TableCell>
                <TableCell align="left">ĐẾN NGÀY</TableCell>
                <TableCell align="left">HÌNH THỨC</TableCell>
                <TableCell align="left">TRẠNG THÁI</TableCell>

            </TableRow>

        {/* DETAIL */}
            <TableRow>
              {/* colspan  => số cột trong collapse */}
              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>           
                    <DiscountDetail parentProps={props}/>       
              </TableCell>
       
            </TableRow>
        </>
    )
}

export default DiscountTableRow
