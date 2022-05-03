import { Typography, ListItem, ListItemText, Divider, ListItemAvatar, Avatar } from "@material-ui/core";

const OutOfStockListItem = ({ product }) => {
  return (
    <>
      <ListItem alignItems="flex-start">
      <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={JSON.parse(product.img_urls).at(0)} />
        </ListItemAvatar>
        <ListItemText
          primary={<>
            {product.name} <br/>
            {product.product_code}
          </>}
          secondary={
            <>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="red"
              >
                <strong>{`Tồn kho: ${product.quantity_available}`}</strong>
              </Typography>
            </>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};
export default OutOfStockListItem