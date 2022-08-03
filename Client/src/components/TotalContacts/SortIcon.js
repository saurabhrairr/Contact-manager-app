import React, { useRef } from "react";

const SortIcon = ({classOwn,classOwn2,sortUp,sortDown,name}) => {

    const arrowUp =useRef();
    const arrowDown =useRef();
    const sortUpLocalClick =(e)=>{
        e.preventDefault();
        // console.log(e.currentTarget.getAttribute("columnname"),"up")
        sortUp(e.currentTarget.getAttribute("columnname"))
    }
    const sortDownLocalClick =(e)=>{
        e.preventDefault();
        // console.log(e.currentTarget.getAttribute("columnname"),"down")
        sortDown(e.currentTarget.getAttribute("columnname"))
    }

    return (
        <div className={classOwn} columnname={name}>
            <svg ref={arrowUp}viewBox="0 0 11 6"  xmlns="http://www.w3.org/2000/svg" className={classOwn2} onClick={sortUpLocalClick} columnname ={name}> 
                <path d="M5.25 6.67572e-06L10.5 5.22501L0 5.22501L5.25 6.67572e-06Z" />
            </svg>
            <svg ref={arrowDown} viewBox="0 0 11 6"  className={classOwn2} xmlns="http://www.w3.org/2000/svg" onClick={sortDownLocalClick} columnname={name}>
                <path d="M5.25 5.22491L0 -9.15527e-05H10.5L5.25 5.22491Z" />
            </svg>
            {/* <div className={classOwn2} onClick={sortUpLocalClick}>
                <svg height={"100%"} width={"100%"} viewBox="0 0 11 6" xmlns="http://www.w3.org/2000/svg" className={classOwn2} >
                    <path d="M5.25 6.67572e-06L10.5 5.22501L0 5.22501L5.25 6.67572e-06Z" />
                </svg>
            </div>
            <div className={classOwn2} onClick={sortDownLocalClick}>
                <svg height={"100%"} width={"100%"} viewBox="0 0 11 6" className={classOwn2} xmlns="http://www.w3.org/2000/svg" >
                    <path d="M5.25 5.22491L0 -9.15527e-05H10.5L5.25 5.22491Z" />
                </svg>
            </div> */}
        </div>
    )
}
export default SortIcon;