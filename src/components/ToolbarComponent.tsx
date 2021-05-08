import {
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  Slider,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { setColumns, setMapData, setTableData } from "../redux/actions";
export const ToolbarComponent = (props: any) => {
  console.log("ToolbarComponent");
  const handleColumnChange = (column: any) => {
    const newColumns = [...props.columns];
    props.setColumns({ columns: newColumns });
  };
  const [sliderValue, setSliderValue] = React.useState([1816, 1900]);
  const marks = [
    {
      value: 1816,
      label: "1816",
    },
    {
      value: 1900,
      label: "1900",
    },
  ];
  const handleSliderChange = (event: any, newValue: any) => {
    setSliderValue(newValue);
  };
  const handleDateChange = (newValue1: any, newValue2: any) => {
    setSliderValue([newValue1, newValue2]);
  };
  const arrayToCSV = (data: any) => {
    let csv = data.map((row: any) => Object.values(row));
    csv.unshift(Object.keys(data[0]));
    return csv.join("\n");
  };
  const download = (csvOrJson: string) => {
    const fields = props.tableRef.current.dataManager.columns.map((c: any) => {
      return c.field;
    });
    const downloadData = props.tableRef.current.state.data.map((d: any) => {
      const data = { ...d };
      Object.entries(data).map((entry: any, key: any, value: any) => {
        if (!fields.includes(entry[0])) {
          delete data[entry[0]];
        }
        return {};
      });
      return data;
    });
    let filename = "data.json";
    let str;
    let element = document.createElement("a");
    if (csvOrJson === "CSV") {
      filename = "export.csv";
      str = arrayToCSV(downloadData);
    } else if (csvOrJson === "JSON") {
      filename = "export.json";
      str = JSON.stringify(downloadData);
    }
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(str)
    );
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  return (
    <Paper style={{ padding: "20px", textAlign: "center" }}>
      <Typography variant="h4" component="div">
        ToolBar
      </Typography>
      <br></br>
      <Typography id="range-slider" gutterBottom>
        Date Range
      </Typography>
      <TextField
        label="Start Date"
        id="filled-size-small1"
        variant="filled"
        size="small"
        value={sliderValue[0]}
        onChange={(newValue) => {
          handleDateChange(newValue.currentTarget.value, sliderValue[1]);
        }}
      />
      <TextField
        label="End Date"
        id="filled-size-small2"
        variant="filled"
        size="small"
        value={sliderValue[1]}
        onChange={(newValue) => {
          handleDateChange(sliderValue[0], newValue.currentTarget.value);
        }}
      />
      <Slider
        value={sliderValue}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        marks={marks}
        min={1816}
        max={1900}
      />
      <Card>
        <CardContent>
          <Typography gutterBottom>Number of Results:</Typography>
          <Typography variant="h5" component="div">
            {props.tableData.length}
          </Typography>
        </CardContent>
      </Card>
      <br></br>
      <Card>
        <CardContent>
          {props.columns.map((column: any) => {
            return (
              <FormGroup key={column.title}>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={column.show}
                      onChange={() => {
                        column.show = !column.show;
                        handleColumnChange(column);
                      }}
                    />
                  }
                  label={column.title}
                />
              </FormGroup>
            );
          })}
        </CardContent>
      </Card>
      <br></br>
      <Button variant="outlined" color="primary">
        Clear Filters
      </Button>
      <br></br> <br></br>
      <Button
        variant="outlined"
        onClick={() => {
          download("CSV");
        }}
        // startIcon={<DownloadIcon />}
      >
        Download CSV
      </Button>
      <br></br> <br></br>
      <Button
        variant="outlined"
        onClick={() => {
          download("JSON");
        }}
        //  startIcon={<DownloadIcon />}
      >
        Download JSON
      </Button>
    </Paper>
  );
};
const mapStateToProps: any = (state: any) => {
  return {
    tableData: state.abolitionData.tableData,
    columns: state.abolitionData.columns,
  };
};
export default connect(mapStateToProps, {
  setMapData,
  setTableData,
  setColumns,
})(ToolbarComponent);
