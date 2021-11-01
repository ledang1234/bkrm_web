import React, {useState, useEffect} from 'react'

import TableWrapper from '../../../components/TableWrapper/TableWrapper'

import JSONdata from '../../../assets/JsonData/customer.json'
import * as HeadCells from '../../../assets/constant/tableHead'
import *  as TableType from '../../../assets/constant/tableType'
import customerApi from '../../../api/customerApi'

const Customer = () => {
    const [customerList, setCustomerList] = useState([]);
    const [reload, setReload] = useState(false);

    const onReload = () => setReload(!reload)
    
    useEffect(() => {
        customerApi.getCustomers()
        .then(response => response.data, err => console.log(err))
        .then(data => {
            setCustomerList(data)
        })

    }, [reload]);

    return (
        <TableWrapper 
            title="Khách hàng"  dataTable={customerList} reload={onReload}
            headerData={HeadCells.CustomerHeadCells} tableType={TableType.CUSTOMER} />
    
    )
}

export default Customer
