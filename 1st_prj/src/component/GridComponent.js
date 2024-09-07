// cd \Project\workspacec\react\1st_prj
// node_modules\.bin\json-server --watch ./src/db/data.json --port 3001
// http://localhost:3001/dept -H "Content-Type: application/json" -d '{"key1": "value1", "key2": "value2"}'
import { useEffect, useRef, useState } from "react"
import {createGrid as createAgGrid} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'; // 필수 CSS
import 'ag-grid-community/styles/ag-theme-quartz.css'; // 선택적 테마

const MyGridComponent = function(){

    /* ===================================================================== *
     * 컴포넌트 변수 선언
     * ===================================================================== */

    let urlRef = useRef('http://localhost:3001/dept')
    const cntrGridRef = useRef(null) // DOM객체는 useRef()로 선언
    const [grid, setGrid] = useState(null)
    const [grdData, setGrdData ] = useState([])
    const [selectedData, setSelectedData] = useState({id : '', code : '', name : ''})


    const edIdSearch   = useRef(null)
    const edCodeSearch = useRef(null)
    const edNameSearch = useRef(null)

    const edIdCrud   = useRef(null)
    const edCodeCrud = useRef(null)
    const edNameCrud = useRef(null)
    
    const getData = async function(URL){
        var response = await fetch(URL)
        var data = await response.json()
        return data
    }

    const createGrid = function(gridContainer){
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
            onRowClicked : (event)=>{
                setSelectedData(event.data)
            }
        }
        createAgGrid(gridContainer, gridOptions);
    }

    const destroyGrid = function(gridContainer, [grid, setGrid]){
        // 이미 그리드가 생성되어 있으면 그리드 파괴 후 삭제
        grid.api.destroy()
        setGrid(null)
        while (gridContainer.firstChild) {
            gridContainer.removeChild(cntrGridRef.firstChild);
        }
    }

    const clearCrudForm = function(){
        edIdCrud.current.value   = ''
        edCodeCrud.current.value = ''
        edNameCrud.current.value = ''
    }

    const btnDeptClick = async function(){
        urlRef.current = 'http://localhost:3001/dept'
        const data = await getData(urlRef.current)
        setGrdData(data)
        clearCrudForm()
    }
    
    const btnTtilClick = async function(){
        urlRef.current = 'http://localhost:3001/titl'
        const data = await getData(urlRef.current)
        setGrdData(data)
        clearCrudForm()
    }
    
    const onBtnClearClicked = function(){
        clearCrudForm()
    }

    const onBtnSaveClicked = async function(){
        const id = edIdCrud.current.value
        const data = {
            code : edCodeCrud.current.value,
            name : edNameCrud.current.value,
        }
        if(id == ""){
            await fetch(urlRef.current, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                console.log('성공:', data);
            })
            .catch((error) => {
                console.error('실패:', error);
            });
        } else {
            await fetch(urlRef.current.concat('/', id), {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
        }

        const list = await getData(urlRef.current)
        setGrdData(list)
        clearCrudForm()
    }
    
    const onBtnDeleteClicked = async function(){
        const id = edIdCrud.current.value
        const data = {
            code : edCodeCrud.current.value,
            name : edNameCrud.current.value,
        }
        await fetch(urlRef.current.concat('/', id), {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                console.log('Deleted successfully');
            }
        })
        .catch(error => console.error('Error:', error));
        
        const list = await getData(urlRef.current)
        setGrdData(list)

    }



    const onBtnSearchClicked = async function(){
        const originalData = await getData(urlRef.current)
        const code = (edCodeSearch.current.value.trim()).toUpperCase()
        const name = (edNameSearch.current.value.trim()).toUpperCase()
        const filteredList = originalData.filter(
            (ele) => {
                const codeEle = (ele.code.trim()).toUpperCase()
                const nameEle = (ele.name.trim()).toUpperCase()

                const codeSrarch = code === '' || codeEle.indexOf(code) >= 0
                const nameSearch = name === '' || nameEle.indexOf(name) >= 0
                const result = codeSrarch && nameSearch

                return result
            }
        )
        setGrdData(filteredList)
    }
    /* ===================================================================== *
     * 반응 이벤트
     * ===================================================================== */

    useEffect(
        // 페이지 로딩시 최초 한번 그리드를 그린다
        ()=>{
            if(grid) {
                // 이미 그리드가 생성되어 있으면 그리드 파괴 후 삭제
                destroyGrid(cntrGridRef, [grid, setGrid])
            }
            createGrid(cntrGridRef.current)

            return ()=>{
                if(grid) {
                    // 이미 그리드가 생성되어 있으면 그리드 파괴 후 삭제
                    destroyGrid(cntrGridRef.current, [grid, setGrid])
                }
            }
        }, 
        [] // 페이지 로딩시 최초 한번 실행
    )

    useEffect(
        // 그리드가 생성되면 데이터를 읽어온다
        ()=>{
            const setGridData = async () => {
                if(!grid) return
                const data = await getData('http://localhost:3001/dept')
                setGrdData(data)
            }
            setGridData()
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
            edIdCrud.current.value = selectedData.id
            edCodeCrud.current.value = selectedData.code
            edNameCrud.current.value = selectedData.name
        }, 
        [selectedData]
    )

    return (
        <div>
            <div>
                code : <input ref={edCodeSearch}/>
                name : <input ref={edNameSearch}/>
                <button onClick={onBtnSearchClicked}>Search</button>
            </div>
            <p></p>
            <button onClick={btnDeptClick}>Depart</button>
            <button onClick={btnTtilClick}>Title</button>
            <p></p>
            <div ref={cntrGridRef}/>
            <p></p>
            <div>
                id   : <input ref={edIdCrud} readOnly/>
                code : <input ref={edCodeCrud}/>
                name : <input ref={edNameCrud}/>
            </div>
            <p></p>
            <div>
                <button onClick={onBtnClearClicked}>Clear</button>
                <button onClick={onBtnSaveClicked}>Save</button>
                <button onClick={onBtnDeleteClicked}>Delete</button>
            </div>
        </div>
    )
}
export default MyGridComponent