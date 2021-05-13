import React from "react";

export const ProductList = 
React.forwardRef(({children},ref) => {
    return (
        <React.Fragment>
            <label htmlFor="select-product" ><strong>Select Product: </strong></label>
            <select id="select-product" ref={ref} style={{marginLeft:"0.5em", diplay:"flex", flexDirection:"row"}}>{children} </select>
        </React.Fragment>
    )
})

export function ProductListItem({children}) {
    return <option>{children.key}</option>
}


export const ProductQtyInput =
 React.forwardRef((props, ref) => {
        return (
        <div>
        <strong>Number of Packages:</strong><input id="productQty" ref={ref} style={{marginLeft:"0.5em"}}></input> 
        </div>
        )

    })


export function SetProductBtn(props) {
    return (
            <button className="setProduct"{...props}>Set Product</button>
    )
}