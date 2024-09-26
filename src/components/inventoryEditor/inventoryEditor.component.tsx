import { Grid2, Typography } from "@mui/material";
import React, { useState } from "react";
import { IInventory } from "../../types/types";
import { FormControl } from "../formControl/formControl.component";

export interface IInventoryEditor{
    selectedProduct: IInventory
}

export const InventoryEditor:React.FC<IInventoryEditor> = function({selectedProduct}){

    const [formControl, setFormControl] = useState({...selectedProduct});

    const onCategoryChange:React.ChangeEventHandler<HTMLInputElement> = e => {
        setFormControl(prevState=>({
            ...prevState, 
            category:e.target.value as any
        }));
    }

    const onPriceChange:React.ChangeEventHandler<HTMLInputElement> = e => {
        setFormControl(prevState=>({
            ...prevState, 
            price:e.target.value as any
        }));
    }

    const onQuantityChange:React.ChangeEventHandler<HTMLInputElement> = e => {
        setFormControl(prevState=>({
            ...prevState, 
            quantity:e.target.value as any
        }));
    }

    const onValueChange:React.ChangeEventHandler<HTMLInputElement> = e => {
        setFormControl(prevState=>({
            ...prevState, 
            value:e.target.value as any
        }));
    }

    return <Grid2>
        <Typography variant="h3">Edit Product</Typography>
        <Typography variant="body1"></Typography>
        <Grid2 container>
            <FormControl label="Category" value={formControl.category} onChange={onCategoryChange} id="category"/>
            <FormControl label="Price" value={formControl.price.slice(1)} onChange={onPriceChange} id="price"/>
            <FormControl label="Quantity" value={formControl.quantity} onChange={onQuantityChange} id="quantity"/>
            <FormControl label="Value" value={formControl.value.slice(1)} onChange={onValueChange} id="value"/>
        </Grid2>
    </Grid2>
}