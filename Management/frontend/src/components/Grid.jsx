import React from "react";
import { registerLicense, validateLicense } from "@syncfusion/ej2-base";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Inject,
  Filter,
  Sort,
} from "@syncfusion/ej2-react-grids";

const Grid= (props) =>{
  registerLicense(process.env.REACT_APP_LICENSE_KEY);
  validateLicense(process.env.REACT_APP_LICENSE_KEY)
  return (
    <div style={{ margin: "2%", paddingTop: ""}}>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ backgroundColor: "#e7e7e7", height: "70px" }}
      >
        <h2>{props.page}</h2>
      </div>
      <GridComponent
      
        style={{ backgroundColor:"black"}}
        dataSource={props.data}
        allowPaging="true"
        pageSettings={{ pageSize: 10 }}
        allowFiltering="true"
        filterSettings={{ type: "Menu" }}
        allowSorting="true"
        allowMultiSorting="true"
      >
        <ColumnsDirective>
        {props.content.map((item,idx)=>{
          return (
          <ColumnDirective key={idx} field={item.field} headerText={item.headerText} width={item.width} />
          );
        })}
        </ColumnsDirective>
        <Inject services={[Page, Filter, Sort]} />
      </GridComponent>
    </div>
  );
}

export default Grid;
