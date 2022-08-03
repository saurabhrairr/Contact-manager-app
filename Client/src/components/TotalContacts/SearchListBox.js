import React, { useEffect, useRef } from "react";
import "./SearchListBox.css"



  

const SearchListItem = ({ data,setcurrpage,setcontacts,setSearchitemdisplay,setsearchval}) => {


    const SearchListBoxPageElement = useRef()
    // const Searchbar = useRef()
    // useEffect(() => {
    //     console.log(Searchbar.current.style)
    // }, [setVisibility])

    const handleSearchedEmailClick = async(e)=>{
        // e.preventDefault();
        
        await setcurrpage(0);
        
        await setcontacts([data]);
        await setSearchitemdisplay(true);
        setsearchval(data.email);

    }
    return (
        <div className="SearchListItem" ref={SearchListBoxPageElement}>
            <img src="searchIcon.svg" alt="searchIcon" className="total-contacts-page-searchbar-img" ></img>
            <div  className="search-list-box-item-field">
                <div onClick={handleSearchedEmailClick} className="SearchListItem-list-item-string">{data.email}</div>
                
                </div>
        </div>
    );
}
export default SearchListItem;