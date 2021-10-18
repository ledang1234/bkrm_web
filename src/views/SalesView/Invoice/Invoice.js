import React from 'react'

import TableWrapper from '../../../components/TableWrapper/TableWrapper'

import JSONdata from '../../../assets/JsonData/invoice.json'
import * as HeadCells from '../../../assets/constant/tableHead'
import *  as TableType from '../../../assets/constant/tableType'

const Invoice = () => {
    return (
        <div>
            <TableWrapper title="Hoá đơn" dataTable={JSONdata} headerData={HeadCells.InvoiceHeadCells} tableType={TableType.INVOICE}/>
        </div>
    )
}

export default Invoice
