import React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Inject, Filter, Sort, Edit, Toolbar} from '@syncfusion/ej2-react-grids';
import data from "../dataInv.json";
import './css/DataGrid.css';

const actionComplete = (args) => {
    if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
        const dialog = args.dialog;
        dialog.showCloseIcon = false;
        dialog.height = 400;
        // change the header of the dialog
        dialog.header = args.requestType === 'beginEdit' ? 'Edit Record of ' + args.rowData['itemID'] : 'New Item';
    }
};

function DataGrid(){
    return (
        <div style={{margin: '2%', marginTop: '10%'}}>
            <GridComponent 
                dataSource={data}
                allowPaging='true'
                pageSettings={{pageSize: 10, pageSizes: true}}
                allowFiltering='true'
                filterSettings={{type: 'Menu'}}
                allowSorting='true'
                allowMultiSorting='true'
                editSettings={{
                    allowAdding:true,
                    allowEditing:true,
                    allowDeleting:true,
                    mode:'Dialog'
                    }
                }
                toolbar={
                    [
                        'Add',
                        'Delete',
                        'Edit',
                    ]
                } height={300}
                actionComplete={actionComplete}
                enableStickyHeader='true'>
                <ColumnsDirective>
                    <ColumnDirective field="itemID" headerText="ID" isPrimaryKey='true' width='30' />
                    <ColumnDirective field="itemName" headerText="Item Name" width='50' />
                    <ColumnDirective field="category" headerText="Category" editType='dropdownedit' width='60' />
                    <ColumnDirective field="inStock" headerText="In Stock" editType='numericedit' width='40' />
                    <ColumnDirective field="inUse" headerText="In Use" editType='numericedit' width='40' />
                    <ColumnDirective field="required" headerText="Needed" editType='numericedit' width='30' />
                    <ColumnDirective field="prices" headerText="Price" editType='numericedit' width='50' />
                    <ColumnDirective field="dealerName" headerText="Dealer" editType='dropdownedit' width='50' />
                    <ColumnDirective field="People" editType='numericedit' width='40' />
                    <ColumnDirective field="setPeople" headerText="Working" editType='numericedit' width='40' />
                </ColumnsDirective>
                <Inject services={[Page, Filter, Sort, Edit,Toolbar]}/>
            </GridComponent>
        </div>
    );
}

export default DataGrid;