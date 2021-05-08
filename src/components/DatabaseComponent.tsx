import MaterialTable from "material-table";
import React from "react";
import { Details } from "./Details";
export function DatabaseComponent(props: any) {
  let columns = props.columns;
  columns = props.columns.filter((d: any) => {
    return d.show;
  });
  return (
    <div className="database-component">
      <MaterialTable
        tableRef={props.tableRef}
        columns={columns}
        data={props.data}
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
