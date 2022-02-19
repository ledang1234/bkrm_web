import React, { useEffect, useState } from 'react'
import TagsInput from "../../../../components/TextField/TagsInput"
import { useTheme, makeStyles, styled } from "@material-ui/core/styles";

import AddIcon from '@material-ui/icons/Add';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';

import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';

import {Button, Grid, FormControl, Select,MenuItem} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    formControl: {
        marginRight: 10,
        minWidth: 220,
    },
    row: {
        margin: "15px 20px 10px 20px",
    }

}));



const AddAttribute = ({ attributeList, datas, setDatas, setRelatedList }) => {
    console.log("init", datas)

    const theme = useTheme();
    const classes = useStyles(theme);
    
    function generateList   ()  {
        let newArr = [...datas];
        var mySet  = [];
        for (let i = 0; i < newArr.length ; i++){
            if(mySet.length === 0 ){mySet= newArr[i].items}
            else{
                var _set = [];
                for (let j = 0; j < mySet.length ; j++ ){
                for (let k = 0; k < newArr[i].items.length ; k++ ){
                    _set.push(mySet[j].concat( ' - ',newArr[i].items[k]))
                }
                }
                console.log("_set",_set)
                if(_set.length !== 0) {mySet = _set}
                console.log("mySet",mySet)
            }
         }
        return mySet
      }


    const updateFieldChanged = (index, attr) => {
        let newArr = [...datas];
        newArr[index].key = attr;
        setDatas(newArr);

    }
    const updateValueChanged = (index,value)=>{
        let newArr = [...datas];
        newArr[index].items = value;
        setDatas(newArr);
        var list = []
        generateList().map(e =>list.push({name:e,product_code:"", bar_code: "",standard_price:0, unit_price :0}))
        setRelatedList(list)
    }

    const deleteAttr = (key) => {
        var newArr = [...datas];
        newArr = newArr.filter(row => row.key !== key)
        setDatas(newArr);
        var list = []
        generateList().map(e =>list.push({name:e,product_code:"", bar_code: "",standard_price:0, unit_price :0}))
        setRelatedList(list)
    }

    const addAttrRow = () => {
        let newArr = [...datas];
        newArr.push({ key: "unset", items: []})
        setDatas(newArr);
        var list = []
        generateList().map(e =>list.push({name:e,product_code:"", bar_code: "",standard_price:0, unit_price :0}))
        setRelatedList(list)
    }

    return (
        <div style={{ marginBottom: 10 }}>
            {datas.map((data, index) => {
                return (
                    <AttributeRow attributeList={attributeList} index={index} data={data} datas={datas} updateFieldChanged={updateFieldChanged} deleteAttr={deleteAttr}  updateValueChanged={updateValueChanged}/>
                )
            })}
            <Button variant="outlined" size="small" color="primary" style={{ marginLeft: 20, marginTop: 10, textTransform: "none" }}
                startIcon={<AddIcon />}
                onClick={() => addAttrRow()}>
                Thêm thuộc tính
            </Button>

        </div>
    )
}

export default AddAttribute


const AttributeRow = ({ attributeList, data, datas, updateFieldChanged, index, deleteAttr, setDatas ,updateValueChanged}) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    const [value, setValue] = React.useState([]);


    const handleChangeAttr = (event) => {
        var valid = true;
        datas.map((row)=>{if(row.key === event.target.value){valid = false}    })
        console.log("valid",valid )

        if (valid){
            updateFieldChanged(index, event.target.value)   
        } else{}
    };

    const [selectedItem, setSelectedItem] = React.useState([]);

    function handleSelecetedTags(items) {
        setValue(items);
    }

    useEffect(() => {
        updateValueChanged(index, value)  
    }, [value]);

    return (
        <Grid container className={classes.row} alignItems="center">
            <Grid container item xs={11} alignItems="center" >
                <FormControl className={classes.formControl}>
                    <Select value={data.key} onChange={handleChangeAttr}  >
                        {/* <MenuItem value="" selected disabled hidden>Chọn thuộc tính...</MenuItem> */}
                        {attributeList.map((attr) => {
                            return (<MenuItem value={attr.name}>{attr.name}</MenuItem>)
                        })}
                    </Select>

                </FormControl>
                <EditTwoToneIcon style={{ marginRight: 60 }} />
                <TagsInput style={{ minWidth: 270 }} selectedTags={handleSelecetedTags} selectedItem={selectedItem} setSelectedItem={setSelectedItem} placeholder="Nhấn giá trị và enter"
                />
            </Grid>

            <Grid container item xs={1} >
                <DeleteForeverTwoToneIcon onClick={() => { deleteAttr(data.key) }} />
            </Grid>

        </Grid>
    )
}
