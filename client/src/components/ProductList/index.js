import React from "react";

export const ProductList = 
React.forwardRef(({children},ref) => {
    return (
        <div>
            <label htmlFor="select-product">Select Product: </label>
            <select id="select-product" ref={ref}>{children}</select>
        </div>
    )
})

export function ProductListItem({children}) {
    return <option>{children.key}</option>
}


export const ProductQtyInput =
 React.forwardRef((props, ref) => {
        return <input id="productQty" ref={ref}></input> 
    })


export function SetProductBtn(props) {
    return (
            <button className="setProduct"{...props}>Set Product</button>
        
    )
}