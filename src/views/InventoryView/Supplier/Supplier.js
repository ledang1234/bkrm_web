import React, {useState, useEffect} from 'react'
import TableWrapper from '../../../components/TableWrapper/TableWrapper'

import JSONdata from '../../../assets/JsonData/supplier.json'
import * as HeadCells from '../../../assets/constant/tableHead'
import *  as TableType from '../../../assets/constant/tableType'
import supplierApi from '../../../api/supplierApi'

const Supplier = () => {
    const [supplerList, setSupplierList] = useState([]);
    const [reload, setReload] = useState(false);

    const onReload = () => setReload(!reload)
    
    useEffect(() => {
        supplierApi.getSuppliers()
        .then(response => response.data, err => console.log(err))
        .then(data => {
            setSupplierList(data)
        })

    }, [reload]);

    return (
        <div>
            <TableWrapper title="Nhà cung cấp" dataTable={supplerList} headerData={HeadCells.SupplierHeadCells} tableType={TableType.SUPPLIER} reload={onReload}/>
        </div>
    )
}

export default Supplier
