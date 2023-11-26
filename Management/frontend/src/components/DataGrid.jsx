import React from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Inject,
  Filter,
  Sort,
  Edit,
  Toolbar,
} from "@syncfusion/ej2-react-grids";
import { registerLicense, validateLicense } from "@syncfusion/ej2-base";


// const buttons = document.querySelectorAll(".e-toolbar-item");

// // loop through each button and add a click event listener
// buttons.forEach(function(button) {
//   button.addEventListener("click", function() {
//     // do something when the button is clicked
//     console.log("You clicked a button");
//   });
// });

function DataGrid(props) {
  const actionComplete = (args) => {
     if (args.requestType === "save" || args.requestType==="delete"){
      props.function(args);
    }
  
  };
  registerLicense(process.env.REACT_APP_LICENSE_KEY);
  validateLicense(process.env.REACT_APP_LICENSE_KEY);
  return (
    <div style={{ margin: "2%", marginTop: "3%" }}>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ backgroundColor: "#e7e7e7", height: "70px" }}
      >
        <h2>{props.page}</h2>
      </div>
      <GridComponent
        dataSource={props.data}
        allowPaging="true"
        pageSettings={{ pageSize: 10, pageSizes: true }}
        allowFiltering="true"
        filterSettings={{ type: "Menu" }}
        allowSorting="true"
        allowMultiSorting="true"
        editSettings={{
          allowAdding: !props.edit,
          allowEditing: true,
          allowDeleting: !props.edit,
          mode: "Dialog",
        }}
        toolbar= { props.edit ? ["Edit"]: ["Add", "Delete", "Edit"]}
        height={300}
        actionComplete={actionComplete}
        enableStickyHeader="true"
      >
        <ColumnsDirective>
          {props.content.map((item, idx) => {
            return (
              <ColumnDirective
                key={idx}
                field={item.field}
                headerText={item.headerText}
                width={item.width}
                isPrimaryKey = {item.isPrimaryKey}
                editType={item.editType}
              />
            );
          })}
        </ColumnsDirective>
        <Inject services={[Page, Filter, Sort, Edit, Toolbar]} />
      </GridComponent>
    </div>
  );
}

export default DataGrid;