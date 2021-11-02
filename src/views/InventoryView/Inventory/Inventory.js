import React, {useState, useEffect} from 'react'

import TableWrapper from '../../../components/TableWrapper/TableWrapper'

import JSONdata from '../../../assets/JsonData/inventory.json'
import * as HeadCells from '../../../assets/constant/tableHead'
import *  as TableType from '../../../assets/constant/tableType'
import productApi from '../../../api/productApi'
import { useSelector } from 'react-redux'

const Inventory = () => {
    const [productList, setProductList] = useState([]);
    const [reload, setReload] = useState(false);

    const onReload = () => setReload(!reload)
    const info = useSelector((state) => state.info);
    const store_uuid = info.store.uuid;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await productApi.getProducts(store_uuid)
                setProductList(response.data)
                console.log(response.data)
            } catch(err) {
                console.log(err) 
            }
        }
        fetchProducts()
    }, [reload, store_uuid]);
    return (
        <TableWrapper title="Kho hàng" dataTable={productList} headerData={HeadCells.InventoryHeadCells} tableType={TableType.INVENTORY} reload={onReload}/>
    )
}
export default Inventory
