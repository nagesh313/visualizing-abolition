import MaterialTable from "material-table";
import React from "react";
import { connect } from "react-redux";
import { setMapData, setTableData, setTimeLineData } from "../../redux/actions";
import { initializeResetData } from "../../redux/reducers/abolitionData";
import { Details } from "./Details";

export function DatabaseComponent(props: any) {
  console.log("DatabaseComponent");
  const tableRef = props.tableRef;

  let columns = props.columns;
  const tableDataFiltered = (data: any) => {
    console.log(tableDataFiltered, data);
    if (data.length === 0) {
      const resetData = initializeResetData();
      props.setTimeLineData({ timelineData: resetData.timelineData });
      props.setTableData({ tableData: resetData.tableData });
      props.setMapData({ mapData: resetData.mapData });
      console.log("cleared");
    } else {
      const finalData = tableRef.current.state.data.map((d: any) => ({
        id: d.id,
        letter: d.letter,
        lat: d.lat,
        lon: d.lon,
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
      // const [mapData] = useState<any>(result);

      const timeline = Object.values(
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
      props.setTimeLineData({ timelineData: timeline });
      props.setTableData({ tableData: finalData });
      props.setMapData({ mapData: result });
    }
  };
  columns = props.columns.filter((d: any) => {
    return d.show;
  });
  return (
    <div className="database-component">
      <MaterialTable
        tableRef={props.tableRef}
        onFilterChange={(data: any) => {
          tableDataFiltered(data);
        }}
        columns={columns}
        data={props.tableData}
        options={{
          filtering: true,
        }}
        detailPanel={(data: any) => {
          return (
            <div style={{ padding: "10px" }}>
              <Details data={data}></Details>
            </div>
          );
        }}
      />
    </div>
  );
}
const mapStateToProps: any = (state: any) => {
  return {
    tableData: state.abolitionData.tableData,
    columns: state.abolitionData.columns,
  };
};
export default connect(mapStateToProps, {
  setMapData,
  setTableData,
  setTimeLineData,
})(DatabaseComponent);
