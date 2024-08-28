import { useState, useEffect } from "react"

// json-server --watch ./src/db/data.json --port 3001

export default function(){


    const [deptList, setDeptList] = useState([])
    const [titlList, setTitlList] = useState([])
    useEffect(
        ()=>{
            fetch('http://localhost:3001/dept')
                .then(
                    (response)=>{
                        return response.json()
                    }
                )
                .then(
                    (data)=>{
                        setDeptList(data)
                    }
                )

                fetch('http://localhost:3001/titl')
                    .then(
                        (response)=>{
                            return response.json()
                        }
                    )
                    .then(
                        (data)=>{
                            setTitlList(data)
                        }
                    )
        }, 
        [] // 초기화시 한번만 로딩
    )

    return (
        <div>
        <h2>부서 목록</h2>
        <ul>
            {
                deptList.map(
                    (dept) => (
                        <li key={dept.code}>{dept.name}</li> // dept 객체의 name 속성으로 표시
                    )
                )
            }
        </ul>
        
        <h2>직책 목록</h2>
        <ul>
            {
                titlList.map(
                    (titl) => (
                        <li key={titl.code}>{titl.name}</li> // titl 객체의 title 속성으로 표시
                    )
                )
            }
        </ul>
        </div>
    )

}