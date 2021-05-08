import {
  AppBar,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  Slider,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import "./App.css";
import { DatabaseComponent } from "./components/DatabaseComponent";
import { MapComponent } from "./components/MapComponent";
import { TimelineComponent } from "./components/TimelineComponent";
import data from "./vadata.json";
function App() {
  const [mapData] = useState<any>(data);
  const finalData = mapData.map((d: any) => ({
    id: d.id,
    letter: d.letter,
    lat: d.originsLat,
    lon: d.originsLong,
    summary: d.summary,
    sender: d.sender,
    receiver: d.receiver,
    origin: d.origin,
    impor: d.impor,
    source: d.source,
    dateSent: d.dateSent,
    dateReceived: d.dateReceived,
  }));
  const result = Object.values(
    finalData.reduce(function (r: any, e: any) {
      var key = e.impor;
      if (!r[key]) {
        r[key] = e;
        r[key].z = 1;
      } else {
        r[key].z += 1;
      }
      return r;
    }, {})
  );
  const timelineData = Object.values(
    finalData.reduce(function (r: any, e: any) {
      const split = e?.dateSent?.split("-");
      if (split.length > 0) {
        var key = split[0];
        if (!r[key]) {
          r[key] = { name: split[0] };
          r[key].y = 1;
        } else {
          r[key].y += 1;
        }
        return r;
      } else return {};
    }, {})
  );
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
  const [columns, setColumns] = React.useState([
    { show: false, title: "ID", field: "id" },
    { show: false, title: "Letter", field: "letter" },
    { show: true, title: "Sender", field: "sender" },
    { show: true, title: "Receiver", field: "receiver" },
    { show: false, title: "Origin", field: "origin" },
    { show: true, title: "Imputed Origin", field: "impor" },
    { show: true, title: "Date Sent", field: "dateSent" },
    { show: false, title: "Date Received", field: "dateReceived" },
    { show: true, title: "Summary", field: "summary" },
    { show: false, title: "Source", field: "source" },
  ]);
  const handleColumnChange = (column: any) => {
    // const index = columns.findIndex((d: any) => {
    //   return d.title === column.title;
    // });
    const newColumns = [...columns];
    // newColumns[index] = column;
    setColumns(newColumns);
  };
  const showTab = (tabName: any) => {
    console.log(tabName);
    const w: any = window;
    if (tabName === "DatabaseComponent") {
      w.document.getElementById("DatabaseComponent").style.display = "block";
      w.document.getElementById("MapComponent").style.display = "none";
      w.document.getElementById("TimeLineComponent").style.display = "none";
    } else if (tabName === "MapComponent") {
      w.document.getElementById("DatabaseComponent").style.display = "none";
      w.document.getElementById("MapComponent").style.display = "block";
      w.document.getElementById("TimeLineComponent").style.display = "none";
    } else if (tabName === "TimeLineComponent") {
      w.document.getElementById("DatabaseComponent").style.display = "none";
      w.document.getElementById("MapComponent").style.display = "none";
      w.document.getElementById("TimeLineComponent").style.display = "block";
    }
  };
  const download = (csvOrJson: string) => {
    console.log(csvOrJson);
    if (csvOrJson === "CSV") {
    } else if (csvOrJson === "JSON") {
    }
  };
  return (
    <>
      <Grid
        container
        style={{
          paddingTop: "30px",
          paddingLeft: "30px",
          paddingRight: "30px",
        }}
        spacing={5}
      >
        <Grid item xs={2}>
          <Paper style={{ padding: "20px", textAlign: "center" }}>
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
                  26634
                </Typography>
              </CardContent>
            </Card>
            <br></br>
            <Card>
              <CardContent>
                {columns.map((column: any) => {
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
            {/* <Card>
            <CardContent> */}
            <Button variant="outlined" color="primary">
              Clear Filters
            </Button>
            {/* </CardContent>
          </Card> */}
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
        </Grid>
        <Grid item xs={10}>
          <AppBar position="static">
            <Toolbar>
              <Grid container style={{ textAlign: "center" }}>
                <Grid item xs={4}>
                  <Button
                    color="inherit"
                    onClick={() => showTab("DatabaseComponent")}
                  >
                    Database
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    color="inherit"
                    onClick={() => showTab("MapComponent")}
                  >
                    Map
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    color="inherit"
                    onClick={() => showTab("TimeLineComponent")}
                  >
                    TimeLine
                  </Button>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <Grid item xs={12}>
            <Grid item xs={12} id={"DatabaseComponent"}>
              {/* <TabPanel value={value} index={0}> */}
              <Paper elevation={5}>
                <DatabaseComponent
                  columns={columns}
                  data={finalData}
                ></DatabaseComponent>
              </Paper>
              {/* </TabPanel> */}
            </Grid>
            <Grid item xs={12} id={"MapComponent"} style={{ display: "none" }}>
              {/* <TabPanel value={value} index={1}> */}
              <Paper elevation={5}>
                {/* {value === 1 &&  */}
                <MapComponent data={result}></MapComponent>
                {/* } */}
              </Paper>
              {/* </TabPanel> */}
            </Grid>
            <Grid
              item
              xs={12}
              id={"TimeLineComponent"}
              style={{ display: "none" }}
            >
              {/* <TabPanel value={value} index={2}> */}
              <Paper elevation={5}>
                {/* {value === 2 && ( */}
                <TimelineComponent data={timelineData}></TimelineComponent>
                {/* )} */}
              </Paper>
              {/* </TabPanel> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
