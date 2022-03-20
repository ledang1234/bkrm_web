import React,{useState} from "react";

//import library
import { Typography, Box, IconButton } from "@material-ui/core";

// import icon
import AddIcon from "@material-ui/icons/Add";
import AddCategory from "../AddInventory/AddCategory";
// import project
import CategoryTree from "../../../../components/Category/CategoryTree";
import { useTheme, makeStyles, createStyles } from "@material-ui/core/styles";
import Modal from "../../../../components/Modal/ModalWrapper";
const useStyles = makeStyles((theme) =>
  createStyles({
    headerTitle: {
      fontSize: "1.125rem",
    },
  })
);

const Category = (props) => {
  const { handleClose, open } = props;
  const theme = useTheme();
  const classes = useStyles(theme);

  // loại lương
  const [openAddCategory, setOpenAddCategory] = React.useState(false);
  const handleCloseCategory = () => {
    setOpenAddCategory(false);
  };
  const [reset,setReset] = useState(true)
  const onReset = () =>{
    setReset(reset => !reset)
  }
  return (
    <Modal open={open} handleClose={handleClose}>
      <AddCategory onReset={onReset} open={openAddCategory} handleClose={handleCloseCategory}  reset={reset}/>
      <Box
        flexDirection="row"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography className={classes.headerTitle} variant="h5">
          Danh mục
        </Typography>

        <IconButton
          aria-label="add"
          color="primary"
          onClick={() => {
            setOpenAddCategory(true);
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>

      <CategoryTree style={{ width: 500, maxWith: "80%" }} reset={reset} onReset={onReset}/>
    </Modal>
  );
};

export default Category;
