// cd \Project\workspacec\react\1st_prj
// node_modules\.bin\json-server --watch ./src/db/data.json --port 3001
import { useEffect, useRef, useState } from "react"
import {createGrid} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'; // 필수 CSS
import 'ag-grid-community/styles/ag-theme-quartz.css'; // 선택적 테마

const MyGridComponent = function(){

    /* ===================================================================== *
     * 컴포넌트 변수 선언
     * ===================================================================== */

    const cntrGridRef = useRef(null) // DOM객체는 useRef()로 선언
    const [grid, setGrid] = useState(null)
    const [grdData, setGrdData ] = useState([])


    const edIdSearch = useRef(null)
    const edCodeSearch = useRef(null)
    const edNameSearch = useRef(null)
    const [selectedData, setSelectedData] = useState({id : '', code : '', name : ''})
    const [selectedId, setSelectedId] = useState('')
    const [selectedCode, setSelectedCode] = useState('')
    const [selectedName, setSelectedName] = useState('')

    const FUNCS = {
        DATA : {
            getData : function(URL){
                fetch(URL)
                    .then(
                        (response)=>{
                            if (!response.ok) {
                                throw new Error(`Error ${URL}`);
                            }
                            return response.json()
                        }
                    )
                    .then(
                        (data)=>{
                            setGrdData(data)
                        }
                    )
                    .catch((error)=>{
                        console.log(error.message)
                    })
            }
        },
        GRID : {
            createGrid : function(gridContainer){
                if(gridContainer){
                    gridContainer.classList.add('ag-theme-quartz')
                    gridContainer.style.height = "500px"
                }
                
                const gridOptions = {
                    columnDefs      : [
                        { field: 'idx'      , headerName: '번호', flex: 1},
                        { field: 'code'     , headerName: '코드', flex: 1},
                        { field: 'name'     , headerName: '이름', flex: 1},
                        { field: 'codeName' , headerName: '비고', flex: 2},
                    ],
                    rowData : [], 
                    rowSelection    :'single',
                    onGridReady     : (params) => {
                        params.api.sizeColumnsToFit();
                        setGrid(params)
                    },
                    onRowDoubleClicked : (event)=>{
                        setSelectedData(event.data)
                        console.log(event)
                    }
                }
                createGrid(gridContainer, gridOptions);
            },
            destroyGrid : function(gridContainer, [grid, setGrid]){
                // 이미 그리드가 생성되어 있으면 그리드 파괴 후 삭제
                grid.api.destroy()
                setGrid(null)
                while (gridContainer.firstChild) {
                    gridContainer.removeChild(cntrGridRef.current.firstChild);
                }
            },
        },
    }

    const EVENTS = {
        
        BUTTONS : {
            btnDeptClick : function(){
                FUNCS.DATA.getData('http://localhost:3001/dept')
            },
            btnTtilClick : function(){
                FUNCS.DATA.getData('http://localhost:3001/titl')
            },
        },
    }


    /* ===================================================================== *
     * 반응 이벤트
     * ===================================================================== */

    useEffect(
        // 페이지 로딩시 최초 한번 그리드를 그린다
        ()=>{
            if(grid) {
                // 이미 그리드가 생성되어 있으면 그리드 파괴 후 삭제
                FUNCS.GRID.destroyGrid(cntrGridRef, [grid, setGrid])
            }
            FUNCS.GRID.createGrid(cntrGridRef.current)

            return ()=>{
                if(grid) {
                    // 이미 그리드가 생성되어 있으면 그리드 파괴 후 삭제
                    FUNCS.GRID.destroyGrid(cntrGridRef, [grid, setGrid])
                }
            }
        }, 
        [] // 페이지 로딩시 최초 한번 실행
    )

    useEffect(
        // 그리드가 생성되면 데이터를 읽어온다
        ()=>{
            if(!grid) return
            FUNCS.DATA.getData('http://localhost:3001/dept')
        }, 
        [grid] // 그리드가 생성되면 실행
            
    )

    useEffect(
        // 데이터를 읽어온 후에 그리드에 데이터를 보여준다
        ()=>{
            if (!grid) return;
            if (!grdData || grdData.length === 0) return;
            grid.api.setGridOption('rowData', grdData)
        }, 
        [grdData] // // 데이터를 읽어온 후에 실행
    )

    useEffect(
        ()=>{
            setSelectedId(selectedData.id)
            setSelectedCode(selectedData.code)
            setSelectedName(selectedData.name)
        }, 
        [selectedData]
    )

    return (
        <div>
            <div>
                id   : <input ref={edIdSearch} value={selectedId}/>
                code : <input ref={edCodeSearch} value={selectedCode}/>
                name : <input ref={edNameSearch} value={selectedName}/>
            </div>
            <p></p>
            <button onClick={EVENTS.BUTTONS.btnDeptClick}>Depart</button>
            <button onClick={EVENTS.BUTTONS.btnTtilClick}>Title</button>
            <div ref={cntrGridRef}/>
        </div>
    )
}
export default MyGridComponent