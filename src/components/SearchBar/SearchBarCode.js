import {
    InputAdornment,
    Box
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { grey } from "@material-ui/core/colors";
import barcodeIcon from "../../assets/img/icon/barcode_grey.png";
import productApi from "../../api/productApi";
import { CustomTextField } from "./SearchProduct"
import { useSelector } from "react-redux";
import { useState } from "react";

const SearchBarCode = (props) => {
    const info = useSelector((state) => state.info);
    const store_uuid = info.store.uuid;
    const branch_uuid = info.branch.uuid;

    const [barcode,setBarcode] = useState("")

    const onEnter = async (e) =>{
        if(e.key === "Enter" && barcode != ""){
            try {
                const response = await productApi.searchBranchProduct(
                    store_uuid,
                    branch_uuid,
                    barcode
                  );
                  if (response.data.length > 0){
                    props.handleSearchBarSelect(response.data[0]);
                    setBarcode("")
                  }
            } catch (error) {
                console.log(error)
            }
        }
    }
    return <CustomTextField
        fullWidth
        placeholder="Quét mã vạch"
        variant="outlined"
        size="small"
        autoFocus
        onKeyPress={onEnter}
        onChange = {(e) => setBarcode(e.target.value)}
        value = {barcode}
        InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <SearchIcon style={{ color: grey[500] }} />
                </InputAdornment>
            ),
            endAdornment: (
                <InputAdornment position="end">
                    <Box
                        component="img"
                        sx={{ height: 23, width: 23, marginRight: 10 }}
                        src={barcodeIcon}
                    />
                </InputAdornment>
            ),
            style: {
                width: 300,
                padding: "3px",
                margin: "0px"
            },
        }}
    />
}
export default SearchBarCode;