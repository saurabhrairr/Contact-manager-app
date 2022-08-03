import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./TotalContactsPage.css"
// import { parse } from "papaparse"

import SortIcon from "./SortIcon";
import ContactRow from "./ContactRow";
import ImportContactsBox from "../ImportContacts/ImportContactsBox"
import SearchListItem from "./SearchListBox";
import NotificationMessageBox from "../NotificationAlert/NotificationMessageBox";
import DeleteContactsBox from "../DeleteContacts/DeleteContactsBox";
import axios from "axios"
import { useNavigate } from "react-router-dom";

// import {fs} from "fs"

const PageNumber = ({ page, activePage, setActivePage }) => {

    return (
        <div onClick={() => { setActivePage(page) }} className={page === activePage ?
            "total-contacts-page-all-footer-page-navigator-num-active" :
            "total-contacts-page-all-footer-page-navigator-num"}>{page}</div>
    )
}

const TotalContacts = ({ setuserCookie, userCookie, removeuserCookie }) => {
    const navigate = useNavigate();
    if (userCookie.token === "") {
        navigate("/");
    }

    // let NotificationMessage ="";
    // let NotificationOperationName="";
    const [NotificationMessage, setNotificationMessage] = useState("");
    const [NotificationOperationName, setNotificationOperationName] = useState("");


    const userSearchbar = useRef(null)
    const [userName, setUserName] = useState(0);

    const SearchBarBoxLocation = {};
    const [SearchbarBoxVisibility, setSearchbarBoxVisibility] = useState(false);

    const indexData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const [ContactsData, setContactsData] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    const [isSelected, setIsSeleted] = useState(false);
    const [CurrentPage, setCurrentPage] = useState(0);
    const [AllPages, setAllPages] = useState([]);
    const [CurrentPageContacts, setCurrentPageContacts] = useState([]);
    const [isDisplayingSearchedItem, setisDisplayingSearchedItem] = useState(false);

    const [DeleteIndexStorage, setDeleteIndexStorage] = useState([]);

    const SearchBarElement = useRef(0);
    const SearchSuggestionBox = useRef(0);

    const [SearchSuggestions, setSearchSuggestions] = useState([]);

    const [isDeleteContactsVisible, setIsDeleteContactsVisible] = useState(false);
    const [isImportContactsVisible, setIsImportContactsVisible] = useState(false);
    const [isNotificationVisible, setIsNotificationVisible] = useState(false);

    // const handleDrop = (e) => {
    //     const reader = new FileReader()
    //     reader.onload = (result) => {
    //         // console.log(result);
    //         // parse(reader.result);
    //         const out = parse(reader.result.slice(0, -1), {
    //             header: true
    //         }).data;
    //         // console.log(reader.result.slice(0,-1));
    //         console.log(out[0]);
    //     }
    //     reader.readAsText(e.dataTransfer.files[0]);
    // }

    // var results = Papa.parse(csvString);
    const dimentionMultiplier = 100;

    let calFontHeight = window.innerHeight.toString() + "px";
    let calFontWidth = window.innerWidth.toString() + "px";
    document.body.style.fontSize = ((window.innerHeight / 1117) * 100).toString() + "px";
    document.body.style.width = window.innerWidth.toString() + "px";
    document.body.style.height = window.innerHeight.toString() + "px";

    let calMulHeight = parseInt(window.innerHeight * dimentionMultiplier / 1117) / dimentionMultiplier;
    let calmulWidth = parseInt(window.innerWidth * dimentionMultiplier / 1727) / dimentionMultiplier;
    // let calMulHeight = Number((window.innerHeight/1117).toFixed(2));
    // let calmulWidth = Number((window.innerWidth/1727).toFixed(2));
    // const [ContainerStyle, setContainerStyle] = useState({ height: calFontHeight, width: calFontWidth });
    const [SizeMultiplier, setSizeMultiplier] = useState({ "--widthmultiplier": calmulWidth, "--heightmultiplier": calMulHeight, height: calFontHeight, width: calFontWidth });
    // console.log(SizeMultiplier)
    let timeoutNotificationID;
    const handleNotificationSent = async (message, operation) => {
        await setNotificationMessage(message);
        await setNotificationOperationName(operation);
        await setIsNotificationVisible(true);
        timeoutNotificationID = setTimeout(() => {
            // setIsSeleted(false);
            setIsNotificationVisible(false);
        }, 2000);

    }
    const handleClearNotificationTimeout = () => {
        clearTimeout(timeoutNotificationID);
        // setIsSeleted(false);
        setIsNotificationVisible(false);
    }

    useLayoutEffect(() => {
        function handleResize() {
            // let calFontHeight= (window.innerHeight/1117).toFixed(3).toString()+"px";
            // let calFontWidth= (window.innerWidth/1117).toFixed(3).toString()+"px";
            let calFontHeight = window.innerHeight.toString() + "px";
            let calFontWidth = window.innerWidth.toString() + "px";
            let calMulHeight = (parseInt(window.innerHeight * dimentionMultiplier / 1117) / dimentionMultiplier);
            let calmulWidth = (parseInt(window.innerWidth * dimentionMultiplier / 1727) / dimentionMultiplier);
            // let calMulHeight = Number((window.innerHeight/1117).toFixed(2));
            // let calmulWidth = Number((window.innerWidth/1727).toFixed(2));
            setSizeMultiplier({ "--widthmultiplier": calmulWidth, "--heightmultiplier": calMulHeight, height: calFontHeight, width: calFontWidth });
            console.log(calmulWidth, calMulHeight);
            // setContainerHeight(calFontHeight);
            // setContainerWidth(calFontWidth);
            // setContainerStyle({ height: calFontHeight, width: calFontWidth })
            console.log(calFontHeight, calFontWidth);
            document.body.style.fontSize = ((window.innerHeight / 1117) * 100).toString() + "px";
            document.body.style.width = window.innerWidth.toString() + "px";
            document.body.style.height = window.innerHeight.toString() + "px";
            console.log(SizeMultiplier)


        }
        window.addEventListener("resize", handleResize);
        return () => { window.removeEventListener("resize", handleResize) };
    }, []);

    useEffect(() => {
        if (userCookie.token === "") {
            navigate("/");
        }
        fetch("https://contactsmanager-server.herokuapp.com/user/contacts", {
            // Adding method type
            method: "GET",
            // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "authorization": userCookie.token//"eyJhbGciOiJIUzI1NiJ9.ZGluZXNoYm9yc2VAZ21haWwuY29t.GcNFxh1NL1qMb17t48u33Jo9am194niNyFonB8r1G9Q"
            }
        })
            // Converting to JSON
            .then(response => response.json())
            // Displaying results to console
            .then(json => {

                json.data.forEach((element, i) => {
                    element.index = i;
                });
                setUserName(json.username);
                setContactsData(json.data)
                console.log(json.data);
                setCurrentPage(1);
            }).catch((err) => {
                console.log(err)
            });
        // else{
        // axios({
        //     url: "https://contactsmanager-server.herokuapp.com/user/contacts",
        //     // url: "https://contactsmanager-server.herokuapp.com/user/contacts",
        //     method: "GET",
        //     headers: {
        //         "Content-type": "application/json; charset=UTF-8",
        //         "authorization": userCookie.token//"eyJhbGciOiJIUzI1NiJ9.ZGluZXNoYm9yc2VAZ21haWwuY29t.GcNFxh1NL1qMb17t48u33Jo9am194niNyFonB8r1G9Q"
        //     },
        //     // data: {}
        // }).then((resp) => {
        //     console.log(resp.data)

        //     resp.data.data.forEach((element, i) => {
        //         element.index = i;
        //     });
        //     setUserName(resp.data.username);
        //     setContactsData(resp.data.data)
        //     console.log(resp.data);
        //     setCurrentPage(1);

        // }).catch((err) => {
        //     // window.alert(err.response.data.message)
        //     console.log(err);

        // })}
    }, [isImportContactsVisible, isDeleteContactsVisible, userCookie.token])

    const DeleteOneContact = (contact) => {
        console.log(contact);
        fetch("https://contactsmanager-server.herokuapp.com/user/contact/deleteone", {
            // Adding method type
            method: "DELETE",
            // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "authorization": userCookie.token//"eyJhbGciOiJIUzI1NiJ9.ZGluZXNoYm9yc2VAZ21haWwuY29t.GcNFxh1NL1qMb17t48u33Jo9am194niNyFonB8r1G9Q"
            },
            body: JSON.stringify({
                contact: { index: contact.index }
            })
        })
            // Converting to JSON
            .then(response => response.json())
            // Displaying results to console
            .then(json => {
                console.log(json.status);
                if (json.status === "success") {
                    console.log(json.data);
                    json.data.forEach((element, i) => {
                        element.index = i;
                    });
                    setContactsData(json.data);
                    setCurrentPage(1);
                }
            });
    }
    const DeleteSelectedContacts = () => {
        

        fetch("https://contactsmanager-server.herokuapp.com/user/contact/deletemany", {
            // Adding method type
            method: "DELETE",
            // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "authorization": userCookie.token//"eyJhbGciOiJIUzI1NiJ9.ZGluZXNoYm9yc2VAZ21haWwuY29t.GcNFxh1NL1qMb17t48u33Jo9am194niNyFonB8r1G9Q"
            },
            body: JSON.stringify({
                contact: { index: DeleteIndexStorage }
            })
        })
            // Converting to JSON
            .then(response => response.json())
            // Displaying results to console
            .then(json => {
                console.log(json.status);
                if (json.status === "success") {
                    console.log(json.data);
                    json.data.forEach((element, i) => {
                        element.index = i;
                    });
                    setIsDeleteContactsVisible(false);
                    setIsSeleted(false);
                    setDeleteIndexStorage([]);
                    setContactsData(json.data);
                    handleNotificationSent("", "Deleted Contacts")
                    setisDisplayingSearchedItem(false)
                    setCurrentPage(1);
                }
                else{
                    window.alert(json.message)
                }
            });
            // .catch((err)=>{
            //     console.log(err);
            //     window.alert(err)
            // })
    }
    // const AddContactForDeleteRequest = (index) => { //selectForDelete={AddContactForDeleteRequest} removeSelectForDelete={RemoveContactForDeleteRequest}
    //     let deletearr = DeleteIndexStorage;
    //     let sliceIndex = deletearr.indexOf(index);
    //     if (sliceIndex === -1) {
    //         setDeleteIndexStorage([...deletearr, index])
    //     }
    //     return DeleteIndexStorage;
    // }

    // const RemoveContactForDeleteRequest = (index) => {
    //     let deletearr = DeleteIndexStorage;
    //     let sliceIndex = deletearr.indexOf(index);
    //     if (sliceIndex !== -1) {
    //         setDeleteIndexStorage(deletearr.splice(sliceIndex, 1))
    //     }
    //     return DeleteIndexStorage;
    // }
    const handleSortUpClick = (column) => {
        const compareSortAsc = (a, b) => {
            if (a[column] > b[column]) {
                return 1;
            }
            else {
                return -1
            }
        }
        console.log(column)
        const tempData = [...ContactsData]
        tempData.sort(compareSortAsc)
        setContactsData([...tempData])
        setCurrentPage(1);
        setIsSeleted(false);
        setDeleteIndexStorage([]);
    }

    const handleSortDownClick = (column) => {
        const compareSortDsc = (a, b) => {
            if (a[column] > b[column]) {
                return -1;
            }
            else {
                return 1
            }
        }
        console.log(column)
        const tempData = [...ContactsData]
        tempData.sort(compareSortDsc)
        setContactsData([...tempData])
        setCurrentPage(1);
        setIsSeleted(false);
        setDeleteIndexStorage([]);
    }

    const handleMarkAll = (e) => {
        console.log(e.currentTarget.checked)
        // setIsSeleted(!isSelected);
        if (e.currentTarget.checked) {
            setIsSeleted(true);
            // e.currentTarget.checked=true;
            let arr = []
            CurrentPageContacts.forEach((ele) => {
                arr.push(ele.index);
            })
            setDeleteIndexStorage([...arr]);
        }
        else {
            setIsSeleted(false);
            setDeleteIndexStorage([]);
        }
    }

    useEffect(() => {
        if (!isDisplayingSearchedItem) {
            setCurrentPageContacts(ContactsData.slice((11 * (CurrentPage - 1)), (11 * CurrentPage)));
        }
        let temptotalpages = Math.ceil(ContactsData.length / 11)
        const tempAllpages = []
        for (let i = 0; i < temptotalpages; i++) {
            tempAllpages.push(i + 1);
        }
        setAllPages(tempAllpages);
    }, [CurrentPage, ContactsData, isDisplayingSearchedItem, userName, isImportContactsVisible, SearchSuggestions]);

    // useEffect(() => {
    //     console.log(DeleteIndexStorage)

    // }, [CurrentPageContacts]);

    useEffect(() => {
        console.log(DeleteIndexStorage)

    }, [DeleteIndexStorage, isSelected]);

    const HandleSearchBarClick = () => {
        setSearchbarBoxVisibility(true);
        // SearchBarElement.current.style.backgroundColor = "white"
        console.log(SearchBarElement.current.getBoundingClientRect())
        let dimension = SearchBarElement.current.getBoundingClientRect()
        SearchBarBoxLocation.top = dimension.bottom;
        SearchBarBoxLocation.left = dimension.left;

        console.log(SearchBarBoxLocation)
    }
    const HandleSearchBarFocus = () => {
        setSearchbarBoxVisibility(true);
        SearchBarElement.current.style.backgroundColor = "white"
        SearchBarElement.current.style.boxShadow = "1px 1px 20px rgba(0, 0, 0, 0.1)"
        // console.log(SearchBarElement.current.getBoundingClientRect())
        let dimension = SearchBarElement.current.getBoundingClientRect()

        SearchBarBoxLocation.top = dimension.bottom;
        SearchBarBoxLocation.left = dimension.left;

        SearchSuggestionBox.current.style.top = (dimension.bottom).toString() + "px";
        SearchSuggestionBox.current.style.left = (dimension.left).toString() + "px";
        SearchSuggestionBox.current.style.width = (dimension.width).toString() + "px";
        SearchBarElement.current.style.boxShadow = "1px 1px 20px rgba(0, 0, 0, 0.1)"
        SearchSuggestionBox.current.style.display = "flex";

        console.log(SearchBarBoxLocation)
    }

    const handleUserSearchinput = (e) => {
        e.preventDefault();
        let tempData = []
        if (e.currentTarget.value.length) {
            ContactsData.forEach((ele) => {
                if (ele.email.includes(e.currentTarget.value)) {
                    tempData.push(ele);
                }
                // console.log(ele.email)
            })
        }
        setSearchSuggestions(tempData);

    }

    const handleSearchStopClick = (e) => {
        // e.preventDefault();
        // SearchBarElement.current.style.backgroundColor = "#F2F2F2"
        // SearchSuggestionBox.current.style.display = "none";
        // SearchBarElement.current.style.boxShadow = "1px 1px 20px rgba(0, 0, 0, 0.0)"
        setSearchbarBoxVisibility(false);
    }
    const handleTotalContactsClick = async () => {
        await setCurrentPage(1);
        await setisDisplayingSearchedItem(false);

    }

    const handleLogoutClick = async () => {
        await setuserCookie("token", "", { path: "/" })
        // window.location.reload();
        if (userCookie.token === "") {
            navigate("/");
        }

    }

    const setuserSearchbarValue = (email) => {
        userSearchbar.current.value = email;
        console.log(userSearchbar.current);
        setSearchSuggestions([]);
        userSearchbar.current.value = ""
        SearchBarElement.current.style.backgroundColor = "#F2F2F2";
        SearchBarElement.current.style.boxShadow = ""
    }

    const handleNextPageClick = () => {
        console.log(CurrentPage, "handleNextPageClick")
        if (CurrentPage < AllPages.length) {
            setCurrentPage(CurrentPage + 1);
        }
    }
    const handlePrevPageClick = () => {
        console.log(CurrentPage, "handlePrevPageClick")
        if (CurrentPage > 1) {
            setCurrentPage(CurrentPage - 1);
        }
    }

    //     useEffect(() => {
    //     /**
    //      * Alert if clicked on outside of element
    //      */
    //     function handleClickOutside(event) {
    //       if ((SearchSuggestionBox.current && !SearchSuggestionBox.current.contains(event.target)&& (SearchBarElement.current && !SearchBarElement.current.contains(event.target)))) {
    //         alert("You clicked outside of me!");
    //       }
    //     }
    //     // Bind the event listener
    //     document.addEventListener("mousedown", handleClickOutside);
    //     return () => {
    //       // Unbind the event listener on clean up
    //       document.removeEventListener("mousedown", handleClickOutside);
    //     };
    //   }, [SearchSuggestionBox,SearchBarElement]);
    return (//style={ContainerStyle} //{"--widthmultiplier":0.5,"--heightmultiplier":0.5}
        <div id="total-contacts-page-container" style={SizeMultiplier} >
            <div className="total-contacts-page-left-menu">
                <p className="total-contacts-page-left-menu-logo">Logo</p>
                {/* <div className="total-contacts-page-left-menu-dashboard-div"> */}
                <img src="dashboard-logo.svg" className="total-contacts-page-left-menu-dashboard-img" alt="dashboard-logo"></img>
                <div className="total-contacts-page-left-menu-dashboard-p">Dashboard</div>
                {/* </div> */}
                <div className="total-contacts-page-left-menu-totalcontacts-div">
                    <img src="TotalContactsIcon.svg" className="total-contacts-page-left-menu-totalcontacts-img" alt="TotalContactsIcon"></img>
                    <div onClick={handleTotalContactsClick} className="total-contacts-page-left-menu-totalcontacts-name">Total Contacts</div>
                    <img src="Pipe.svg" className="total-contacts-page-left-menu-totalcontacts-pipe-img" alt="Pipe"></img>

                </div>
                <div onClick={handleLogoutClick} className="total-contacts-page-left-menu-logout">
                    <img src="Vectorlogout.svg" alt="Vectorlogout" className="total-contacts-page-left-menu-logout-img" />
                    <div className="total-contacts-page-left-menu-logout-name">Logout</div>
                </div>
            </div>
            <div className="total-contacts-page-all-right-container-div">
                <div className="total-contacts-page-all-contacts-container-div">
                    <div className="total-contacts-page-searchbar-menu-div">
                        <div className="total-contacts-page-right-div-name">
                            Total Contacts
                        </div>
                        <div ref={SearchBarElement} className="total-contacts-page-searchbar-form" >
                            <img src="searchIcon.svg" alt="searchIcon" className="total-contacts-page-searchbar-img" ></img>
                            <input ref={userSearchbar} type={"text"} onClick={HandleSearchBarClick} onFocus={HandleSearchBarFocus} onChange={handleUserSearchinput}
                                className="total-contacts-page-searchbar-input" placeholder="Search by Email Id..... "></input >
                        </div>
                        <div className="total-contacts-page-userinfo-container-div">
                            <img src="userpic.png" alt="userpic" className="total-contacts-page-userinfo-img"></img>
                            <div className="total-contacts-page-userinfo-div">
                                <div className="total-contacts-page-userinfo-username">{userName}</div>
                                <div className="total-contacts-page-userinfo-authority">Super Admin</div>
                            </div>
                        </div>
                    </div>
                    <div className="total-contacts-page-all-contacts-div">
                        <div className="total-contacts-page-all-contacts-buttons-container">
                            <div className="total-contacts-page-btn-select-date">
                                <img src="Vectorcalender.svg" alt="Vectorcalender" className="total-contacts-page-btn-select-date-calender-img"></img>
                                <div className="total-contacts-page-btn-select-date-name">Select Date</div>
                                <img src="VectordownArrow.svg" alt="VectordownArrow" className="total-contacts-page-btn-select-date-downarrow-img"></img>
                            </div>
                            <div className="total-contacts-page-btn-filters">
                                <img src="Vectorfilter.svg" alt="Vectorfilter" className="total-contacts-page-btn-filters-icon-img"></img>
                                <div className="total-contacts-page-btn-filters-name">Filters</div>
                                <img src="Pipe.svg" alt="pipe" className="total-contacts-page-btn-filters-pipe-img"></img>
                                <img src="VectordownArrow.svg" alt="VectordownArrow" className="total-contacts-page-btn-filters-downarrow-img"></img>
                            </div>
                            <div onClick={() => {
                                if (DeleteIndexStorage.length) {
                                    console.log(DeleteIndexStorage); setIsDeleteContactsVisible(true)
                                }
                            }} className="total-contacts-page-btn-delete">
                                <img src="Vectordelete.svg" alt="Vectordelete" className="total-contacts-page-btn-delete-icon-img"></img>
                                <div className="total-contacts-page-btn-delete-name">Delete</div>
                            </div>
                            <div onClick={() => {setIsImportContactsVisible(true) }} className="total-contacts-page-btn-import">
                                <img src="Vectorimport.svg" alt="Vectorimport" className="total-contacts-page-btn-import-icon-img"></img>
                                <div className="total-contacts-page-btn-import-name">Import</div>
                            </div>
                            <div className="total-contacts-page-btn-export">
                                <img src="Vectorexport.svg" alt="Vectorexport" className="total-contacts-page-btn-export-icon-img"></img>
                                <div className="total-contacts-page-btn-export-name">Export</div>
                            </div>
                        </div>
                        <div className="total-contacts-page-all-contacts-listdown-container">
                            <div className="total-contacts-page-all-contacts-listdown-index">
                                <input type={"checkbox"} onChange={handleMarkAll} className="total-contacts-page-checkbox" checked={isSelected} />
                                <div className="total-contacts-page-listdown-index-name">Name</div>
                                <div className="total-contacts-page-listdown-index-pipe"></div>
                                <div className="total-contacts-page-listdown-index-designation">Designation</div>
                                <SortIcon classOwn={"total-contacts-page-listdown-index-sort-designation"} classOwn2={"total-contacts-page-listdown-index-sortarrowdown-designation "}
                                    sortUp={handleSortUpClick} sortDown={handleSortDownClick} name={"designation"} />
                                <div className="total-contacts-page-listdown-index-pipe-designation"></div>
                                <div className="total-contacts-page-listdown-index-company">Company</div>
                                <SortIcon classOwn={"total-contacts-page-listdown-index-sort-company"} classOwn2={"total-contacts-page-listdown-index-sortarrowdown-company "}
                                    sortUp={handleSortUpClick} sortDown={handleSortDownClick} name={"company"} />
                                <div className="total-contacts-page-listdown-index-pipe-company"></div>
                                <div className="total-contacts-page-listdown-index-industry">Industry</div>
                                <SortIcon classOwn={"total-contacts-page-listdown-index-sort-industry"} classOwn2={"total-contacts-page-listdown-index-sortarrowdown-industry "}
                                    sortUp={handleSortUpClick} sortDown={handleSortDownClick} name={"industry"} />
                                <div className="total-contacts-page-listdown-index-pipe-industry"></div>
                                <div className="total-contacts-page-listdown-index-email">Email</div>
                                <div className="total-contacts-page-listdown-index-pipe-email"></div>
                                <div className="total-contacts-page-listdown-index-phone">Phone Number</div>
                                <div className="total-contacts-page-listdown-index-pipe-phone"></div>
                                <div className="total-contacts-page-listdown-index-country">Country</div>
                                <div className="total-contacts-page-listdown-index-pipe-country"></div>
                                <div className="total-contacts-page-listdown-index-action">Action</div>
                            </div>
                            {CurrentPageContacts.map((ele, i) => {
                                return <ContactRow ConData={ele} rowPosition={indexData[i]}////DeleteOneContact
                                    marked={isSelected} deleteOne={setIsDeleteContactsVisible} delStorage={[DeleteIndexStorage, setDeleteIndexStorage]} />
                            })}
                        </div>
                    </div>
                    {/* <input type={"file"} onDrop={handleDrop} className="total-contacts-page-all-contacts-file-input"></input> */}
                    {/* {SearchbarBoxVisibility && <div className="search-suggestions-page-container" onClick={()=>{setSearchbarBoxVisibility(false);}}> */}
                    <div ref={SearchSuggestionBox} className="total-contacts-page-search-suggestion-box" >
                        {SearchSuggestions.map((ele) => {
                            return <SearchListItem data={ele} setcurrpage={setCurrentPage} setcontacts={setCurrentPageContacts}
                                setSearchitemdisplay={setisDisplayingSearchedItem} setsearchval={setuserSearchbarValue} />
                        })}
                    </div>
                    {/* </div>} */}
                </div>
                <footer className="total-contacts-page-all-footer-container-div">
                    <div className="total-contacts-page-all-footer-page-navigator-container">
                        <div className="total-contacts-page-all-footer-page-navigator-arrow-box-prev" onClick={handlePrevPageClick}>
                            <img className="total-contacts-page-all-footer-page-navigator-arrow-img" src="Vectorpage-arrow-prev.svg" alt="Vectorpage-arrow-prev" />
                        </div>
                        {AllPages.map((ele) => { return <PageNumber page={ele} activePage={CurrentPage} setActivePage={setCurrentPage} /> })}
                        <div className="total-contacts-page-all-footer-page-navigator-arrow-box-next" onClick={handleNextPageClick}>
                            <img className="total-contacts-page-all-footer-page-navigator-arrow-img" src="Vectorpage-arrow-next.svg" alt="Vectorpage-arrow-next" />
                        </div>
                    </div>
                </footer>
            </div>
            {isImportContactsVisible && <ImportContactsBox setOpenModal={setIsImportContactsVisible} setuserCookie={setuserCookie} userCookie={userCookie} notify={handleNotificationSent} />}
            {isNotificationVisible && <NotificationMessageBox setOpenModal={setIsNotificationVisible} message={NotificationMessage} operationDone={NotificationOperationName} cleartimer={handleClearNotificationTimeout} />}
            {isDeleteContactsVisible && <DeleteContactsBox setOpenModal={setIsDeleteContactsVisible} replyDeleteYes={DeleteSelectedContacts} />}
        </div>
    )
}

export default TotalContacts