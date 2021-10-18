import React from 'react'

import TableWrapper from '../../../components/TableWrapper/TableWrapper'

import JSONdata from '../../../assets/JsonData/invoiceReturn.json'
import * as HeadCells from '../../../assets/constant/tableHead'
import *  as TableType from '../../../assets/constant/tableType'
const InvoiceReturn = () => {
    return (
        <div>
            <TableWrapper title="Đơn trả" dataTable={JSONdata} headerData={HeadCells.InvoiceReturnHeadCells} tableType={TableType.INVOICE_RETURN}/>
        </div>
    )
}

export default InvoiceReturn
