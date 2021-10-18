import React from 'react'

import TableWrapper from '../../../components/TableWrapper/TableWrapper'

import JSONdata from '../../../assets/JsonData/customer.json'
import * as HeadCells from '../../../assets/constant/tableHead'
import *  as TableType from '../../../assets/constant/tableType'

const Customer = () => {
    return (
        <div>
            <TableWrapper title="Khách hàng"  dataTable={JSONdata} headerData={HeadCells.CustomerHeadCells} tableType={TableType.CUSTOMER} />
        </div>
    )
}

export default Customer
