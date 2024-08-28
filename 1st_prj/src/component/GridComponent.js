
import { useEffect, useRef } from "react"
import {createGrid} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'; // 필수 CSS
import 'ag-grid-community/styles/ag-theme-quartz.css'; // 선택적 테마

const MyGridComponent = function(){

    const grdDptListRef = useRef(null)

    const funcs = {
        createGrid : function(gridContainer, rowData){
            gridContainer.classList.add('ag-theme-quartz')
            gridContainer.style.height = "500px"
            
            const gridOptions = {
                columnDefs      : [
                    { field: 'idx'      , headerName: '번호', flex: 1},
                    { field: 'code'     , headerName: '코드', flex: 1},
                    { field: 'name'     , headerName: '이름', flex: 1},
                    { field: 'codeName' , headerName: '비고', flex: 2},
                ],
                rowData : rowData, 
                rowSelection    :'single',
                onGridReady     : (params) => {
                    params.api.sizeColumnsToFit();
                    grdDptListRef.current = params
                },
                onRowDoubleClicked : (event)=>{
                    console.log(event)
                }
            }
            createGrid(gridContainer, gridOptions);
        }
    }

    useEffect(
        ()=>{
            funcs.createGrid(
                grdDptListRef.current, 
                [
                    { "code": "D011", "name": "관리과" },
                    { "code": "D012", "name": "총무과" },
                    { "code": "D021", "name": "영업부" },
                    { "code": "D022", "name": "자재과" },
                    { "code": "D023", "name": "생산1과" },
                    { "code": "D024", "name": "생산2과" }
                ]
            )
        }, 
        []
    )
    return (
        <div ref={grdDptListRef}/>
    )
}
export default MyGridComponent