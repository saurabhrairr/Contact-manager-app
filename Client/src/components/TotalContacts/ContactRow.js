import React, { useEffect, useRef, useState } from "react";
import "./ContactRow.css"
const ContactRow = ({ ConData, rowPosition, marked, deleteOne, delStorage }) => { //, selectForDelete, removeSelectForDelete
    const delIndexArr = delStorage[0];
    const delArrFunc = delStorage[1];
    const fieldBubblediv = useRef();
    const fieldBubblestring = useRef();
    // const [fieldBubbleVisibily, setfieldBubbleVisibily] = useState(true);
    const [isSelected, setIsSeleted] = useState(false);


    const handleFieldValueClick = (e) => {
        fieldBubblediv.current.style.display = "flex";
        let rect = e.target.getBoundingClientRect();
        e.target.style.color = "#2DA5FC";
        fieldBubblestring.current.innerHTML = e.target.innerHTML;
        fieldBubblediv.current.style.left = (rect.right - fieldBubblediv.current.getBoundingClientRect().width + window.innerWidth * 30 / 1727).toString() + "px";

        fieldBubblediv.current.style.top = (rect.bottom + 15).toString() + "px";
    }
    const handleFieldMouseOut = (e) => {
        e.target.style.color = "#000000";
        fieldBubblediv.current.style.display = "none";
    };
    const handleDeleteContactClick = async(e) => {
        await setIsSeleted(true);
        await delArrFunc([]);
        await handleContactSelectForDeleteOnChange();
        deleteOne(true);
    }


    const handleContactSelectForDeleteOnChange = () => {
        let res = [];
        if (!isSelected) {
            // res = selectForDelete(ConData.index);
            let deletearr = [...delIndexArr];
            let sliceIndex = deletearr.indexOf(ConData.index);
            if (sliceIndex === -1) {
                delArrFunc([...deletearr, ConData.index])
            }

        }
        else {
            // res = removeSelectForDelete(ConData.index);
            let deletearr = [...delIndexArr];
            let sliceIndex = deletearr.indexOf(ConData.index);
            if (sliceIndex !== -1) {
                delArrFunc([...(deletearr.slice(0, sliceIndex)), ...(deletearr.slice(sliceIndex + 1, deletearr.length))])
            }
        }
        // console.log(delIndexArr);

    }

    // useEffect(()=>{
    //     handleContactSelectForDeleteOnChange()
    // },[isSelected])

    // const getCheckedState=(marked)=>{marked?()=>{setIsSeleted(true)}:()=>{setIsSeleted(false)};}
    // getCheckedState(marked);
    useEffect(() => {
        marked ? setIsSeleted(true) : setIsSeleted(false);
        // console.log(marked)
    }, [marked, ConData]);


    return (
        <div className={rowPosition % 2 !== 0 ? "total-contacts-page-listdown-data" : "total-contacts-page-listdown-data2"}>
            <input type={"checkbox"} onChange={handleContactSelectForDeleteOnChange} onClick={() => { setIsSeleted(!isSelected) }} checked={isSelected} className="total-contacts-page-checkbox" />
            <div onMouseEnter={handleFieldValueClick} onMouseOut={handleFieldMouseOut} className="total-contacts-page-listdown-index-name">{ConData.name}</div>

            <div onMouseEnter={handleFieldValueClick} onMouseOut={handleFieldMouseOut} className="total-contacts-page-listdown-index-designation">{ConData.designation}</div>

            <div onMouseEnter={handleFieldValueClick} onMouseOut={handleFieldMouseOut} className="total-contacts-page-listdown-index-company">{ConData.company}</div>

            <div onMouseEnter={handleFieldValueClick} onMouseOut={handleFieldMouseOut} className="total-contacts-page-listdown-index-industry">{ConData.industry}</div>

            <div onMouseEnter={handleFieldValueClick} onMouseOut={handleFieldMouseOut} className="total-contacts-page-listdown-index-email">{ConData.email}</div>

            <div onMouseEnter={handleFieldValueClick} onMouseOut={handleFieldMouseOut} className="total-contacts-page-listdown-index-phone">{ConData.phoneNo}</div>

            <div onMouseEnter={handleFieldValueClick} onMouseOut={handleFieldMouseOut} className="total-contacts-page-listdown-index-country">{ConData.country}</div>

            <div className="total-contacts-page-listdown-index-action-row">
                <svg viewBox="0 0 17 18" xmlns="http://www.w3.org/2000/svg" className="total-contacts-page-listdown-index-action-edit">
                    <path d="M1.24989 17.1249C1.16169 17.1255 1.07438 17.1073 0.993696 17.0717C0.91301 17.0361 0.840777 16.9838 0.781743 16.9183C0.72271 16.8528 0.678213 16.7755 0.651179 16.6915C0.624144 16.6076 0.615185 16.5189 0.624888 16.4312L1.10614 12.0562C1.12327 11.9164 1.18714 11.7864 1.28739 11.6874L11.5124 1.46244C11.6982 1.2763 11.9188 1.12863 12.1617 1.02787C12.4046 0.927108 12.665 0.875244 12.928 0.875244C13.191 0.875244 13.4514 0.927108 13.6943 1.02787C13.9372 1.12863 14.1579 1.2763 14.3436 1.46244L16.2874 3.40619C16.4735 3.59196 16.6212 3.81262 16.722 4.05553C16.8227 4.29844 16.8746 4.55884 16.8746 4.82182C16.8746 5.0848 16.8227 5.3452 16.722 5.58811C16.6212 5.83102 16.4735 6.05167 16.2874 6.23744L6.06864 16.4562C5.96966 16.5564 5.83972 16.6203 5.69989 16.6374L1.32489 17.1187L1.24989 17.1249ZM2.33114 12.4062L1.95614 15.7937L5.34364 15.4187L15.4061 5.35619C15.4761 5.28652 15.5315 5.20372 15.5694 5.11256C15.6072 5.02139 15.6267 4.92365 15.6267 4.82494C15.6267 4.72623 15.6072 4.62849 15.5694 4.53733C15.5315 4.44617 15.4761 4.36337 15.4061 4.29369L13.4561 2.34369C13.3865 2.27377 13.3037 2.2183 13.2125 2.18044C13.1213 2.14259 13.0236 2.1231 12.9249 2.1231C12.8262 2.1231 12.7284 2.14259 12.6373 2.18044C12.5461 2.2183 12.4633 2.27377 12.3936 2.34369L2.33114 12.4062Z" fill="#0884FF" />
                    <path d="M14.375 7.88117C14.2928 7.88165 14.2112 7.86588 14.1351 7.83478C14.0589 7.80367 13.9897 7.75785 13.9313 7.69992L10.05 3.80617C9.99174 3.7479 9.94552 3.67872 9.91398 3.60258C9.88244 3.52644 9.86621 3.44483 9.86621 3.36242C9.86621 3.28001 9.88244 3.1984 9.91398 3.12226C9.94552 3.04613 9.99174 2.97694 10.05 2.91867C10.1083 2.8604 10.1775 2.81417 10.2536 2.78263C10.3298 2.7511 10.4114 2.73486 10.4938 2.73486C10.5762 2.73486 10.6578 2.7511 10.7339 2.78263C10.8101 2.81417 10.8792 2.8604 10.9375 2.91867L14.8313 6.81242C14.8898 6.87052 14.9363 6.93965 14.9681 7.01581C14.9998 7.09197 15.0161 7.17366 15.0161 7.25617C15.0161 7.33868 14.9998 7.42037 14.9681 7.49653C14.9363 7.57269 14.8898 7.64182 14.8313 7.69992C14.7714 7.75936 14.7001 7.80607 14.6217 7.83722C14.5433 7.86837 14.4594 7.88332 14.375 7.88117Z" fill="#0884FF" />
                    <path d="M10.0533 6.81464L5.1875 11.6804L6.07138 12.5643L10.9372 7.69852L10.0533 6.81464Z" fill="#0884FF" />
                </svg>



                <svg onClick={handleDeleteContactClick} viewBox="0 0 18 20" xmlns="http://www.w3.org/2000/svg" className="total-contacts-page-listdown-index-action-delete">
                    <path d="M14 19.375H4C3.50272 19.375 3.02581 19.1775 2.67417 18.8258C2.32254 18.4742 2.125 17.9973 2.125 17.5V5.625C2.125 5.45924 2.19085 5.30027 2.30806 5.18306C2.42527 5.06585 2.58424 5 2.75 5C2.91576 5 3.07473 5.06585 3.19194 5.18306C3.30915 5.30027 3.375 5.45924 3.375 5.625V17.5C3.375 17.6658 3.44085 17.8247 3.55806 17.9419C3.67527 18.0592 3.83424 18.125 4 18.125H14C14.1658 18.125 14.3247 18.0592 14.4419 17.9419C14.5592 17.8247 14.625 17.6658 14.625 17.5V5.625C14.625 5.45924 14.6908 5.30027 14.8081 5.18306C14.9253 5.06585 15.0842 5 15.25 5C15.4158 5 15.5747 5.06585 15.6919 5.18306C15.8092 5.30027 15.875 5.45924 15.875 5.625V17.5C15.875 17.9973 15.6775 18.4742 15.3258 18.8258C14.9742 19.1775 14.4973 19.375 14 19.375Z" fill="#F81D1D" />
                    <path d="M16.5 4.375H1.5C1.33424 4.375 1.17527 4.30915 1.05806 4.19194C0.940848 4.07473 0.875 3.91576 0.875 3.75C0.875 3.58424 0.940848 3.42527 1.05806 3.30806C1.17527 3.19085 1.33424 3.125 1.5 3.125H16.5C16.6658 3.125 16.8247 3.19085 16.9419 3.30806C17.0592 3.42527 17.125 3.58424 17.125 3.75C17.125 3.91576 17.0592 4.07473 16.9419 4.19194C16.8247 4.30915 16.6658 4.375 16.5 4.375Z" />
                    <path d="M11.5 4.375C11.3342 4.375 11.1753 4.30915 11.0581 4.19194C10.9408 4.07473 10.875 3.91576 10.875 3.75V1.875H7.125V3.75C7.125 3.91576 7.05915 4.07473 6.94194 4.19194C6.82473 4.30915 6.66576 4.375 6.5 4.375C6.33424 4.375 6.17527 4.30915 6.05806 4.19194C5.94085 4.07473 5.875 3.91576 5.875 3.75V1.25C5.875 1.08424 5.94085 0.925268 6.05806 0.808058C6.17527 0.690848 6.33424 0.625 6.5 0.625H11.5C11.6658 0.625 11.8247 0.690848 11.9419 0.808058C12.0592 0.925268 12.125 1.08424 12.125 1.25V3.75C12.125 3.91576 12.0592 4.07473 11.9419 4.19194C11.8247 4.30915 11.6658 4.375 11.5 4.375Z" fill="#F81D1D" />
                    <path d="M9 16.25C8.83424 16.25 8.67527 16.1842 8.55806 16.0669C8.44085 15.9497 8.375 15.7908 8.375 15.625V6.875C8.375 6.70924 8.44085 6.55027 8.55806 6.43306C8.67527 6.31585 8.83424 6.25 9 6.25C9.16576 6.25 9.32473 6.31585 9.44194 6.43306C9.55915 6.55027 9.625 6.70924 9.625 6.875V15.625C9.625 15.7908 9.55915 15.9497 9.44194 16.0669C9.32473 16.1842 9.16576 16.25 9 16.25Z" />
                    <path d="M12.125 15C11.9592 15 11.8003 14.9342 11.6831 14.8169C11.5658 14.6997 11.5 14.5408 11.5 14.375V8.125C11.5 7.95924 11.5658 7.80027 11.6831 7.68306C11.8003 7.56585 11.9592 7.5 12.125 7.5C12.2908 7.5 12.4497 7.56585 12.5669 7.68306C12.6842 7.80027 12.75 7.95924 12.75 8.125V14.375C12.75 14.5408 12.6842 14.6997 12.5669 14.8169C12.4497 14.9342 12.2908 15 12.125 15Z" />
                    <path d="M5.875 15C5.70924 15 5.55027 14.9342 5.43306 14.8169C5.31585 14.6997 5.25 14.5408 5.25 14.375V8.125C5.25 7.95924 5.31585 7.80027 5.43306 7.68306C5.55027 7.56585 5.70924 7.5 5.875 7.5C6.04076 7.5 6.19973 7.56585 6.31694 7.68306C6.43415 7.80027 6.5 7.95924 6.5 8.125V14.375C6.5 14.5408 6.43415 14.6997 6.31694 14.8169C6.19973 14.9342 6.04076 15 5.875 15Z" />
                </svg>

            </div>
            {<div ref={fieldBubblediv} className="total-contacts-page-field-bubble">
                <svg className="total-contacts-page-field-bubble-arrow" viewBox="0 0 24 18" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0L23.2583 18H0.74167L12 0Z" /></svg>
                <div ref={fieldBubblestring} className="total-contacts-page-field-bubble-string" >thejlksajdkljas</div>
            </div>}
        </div>
    );
}
export default ContactRow;