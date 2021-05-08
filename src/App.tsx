import { Grid } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import "./App.css";
import { TabsComponent } from "./components/Tabs";
import ToolbarComponent from "./components/ToolbarComponent";
import { setMapData, setTableData, setTimeLineData } from "./redux/actions";

function App() {
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
          <ToolbarComponent></ToolbarComponent>
        </Grid>
        <TabsComponent></TabsComponent>
      </Grid>
    </>
  );
}
const mapStateToProps: any = (state: any) => {
  return {};
};
export default connect(mapStateToProps, {
  setMapData,
  setTableData,
  setTimeLineData,
})(App);
