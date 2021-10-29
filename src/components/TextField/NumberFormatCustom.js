import React from "react";
import NumberFormat from "react-number-format";
import TextField from "@material-ui/core/TextField";

function VNDFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      suffix="đ"
    />
  );
}

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
    />
  );
}

export default function VNDInput(props) {
  return (
    <TextField
      name="numberformat"
      InputProps={{
        inputComponent: VNDFormatCustom,
      }}
      {...props}
    />
  );
}
export function ThousandSeperatedInput(props) {
  return (
    <TextField
      name="numberformat"
      InputProps={{
        inputComponent: NumberFormatCustom,
      }}
      {...props}
    />
  );
}
