import React from 'react'
import TableWrapper from '../../../components/TableWrapper/TableWrapper'

import JSONdata from '../../../assets/JsonData/supplier.json'
import * as HeadCells from '../../../assets/constant/tableHead'
import *  as TableType from '../../../assets/constant/tableType'

const Supplier = () => {
    return (
        <div>
            <TableWrapper title="Nhà cung cấp" dataTable={JSONdata} headerData={HeadCells.SupplierHeadCells} tableType={TableType.SUPPLIER}/>
        </div>
    )
}

export default Supplier
