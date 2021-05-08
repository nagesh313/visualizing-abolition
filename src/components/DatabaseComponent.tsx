import React from "react";
import MaterialTable from "material-table";
import { Details } from "./Details";
export function DatabaseComponent(props: any) {
  let columns = props.columns;
  columns = props.columns.filter((d: any) => {
    return d.show;
  });
  return (
    <div className="database-component">
      <MaterialTable
        columns={columns}
        data={props.data}
        options={{
          filtering: true,
        }}
        detailPanel={(rowData: any) => {
          return (
            <div style={{ padding: "10px" }}>
              <Details data={rowData}></Details>
            </div>
          );
        }}
      />
    </div>
  );
}
