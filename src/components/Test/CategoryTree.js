import React, { useEffect, useState } from 'react'
import RootCategory from './List/RootCategory'
import productApi from '../../api/productApi'
import { useSelector } from 'react-redux'

const CategoryTree = () => {
    const info = useSelector((state) => state.info);
    const store_uuid = info.store.uuid;
    const [parentCategories, setParentCategories] = useState([]);
    useEffect(() => {
        const fetchCategoryList = async () => {
            try {
                const categories = await productApi.getParentCategory(store_uuid)
                setParentCategories(categories.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchCategoryList();
    }, [store_uuid])
    return (
        <React.Fragment>
            {parentCategories.map((category) => <RootCategory category={category} />)}
        </React.Fragment>
    )
}

export default CategoryTree
