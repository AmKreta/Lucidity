import { Button, Grid2, Typography } from "@mui/material";
import React, { useState } from "react";
import { IInventory } from "../../types/types";
import { FormControl } from "../formControl/formControl.component";
import './inventoryEditor.styles.css';
import { useAppDispatch } from "../../hooks/store/store.hook";
import { InventoryActions } from "../../store/inventory/inventory.store";

export interface IInventoryEditor{
    selectedProduct: IInventory;
    closeModal: React.MouseEventHandler<HTMLElement>;
}

export const InventoryEditor:React.FC<IInventoryEditor> = function({selectedProduct, closeModal}){

    const [formControl, setFormControl] = useState<IInventory<''>>({
        id: selectedProduct.id,
        category: selectedProduct.category,
        name: selectedProduct.name,
        price: selectedProduct.price.slice(1),
        quantity: selectedProduct.quantity,
        value: selectedProduct.value.slice(1)
    });

    const dispatch = useAppDispatch();

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

    const onSave = ()=>{
        dispatch(InventoryActions.updateInventory(formControl));
        closeModal(null as any);
    }

    return <div className="inventory-editor-container" onClick={closeModal}>
        <Grid2 className="inventory-editor" sx={{backgroundColor:'grey.800'}} onClick={e=>e.stopPropagation()}>
            <Typography variant="h3" color="grey.300" mt="8px">Edit Product</Typography>
            <Typography variant="body1" color="grey.300">{formControl.name}</Typography>
            <Grid2 container gap={2} sx={{marginTop:'24px'}}>
                <FormControl label="Category" value={formControl.category} onChange={onCategoryChange} id="category"/>
                <FormControl label="Price" value={formControl.price} onChange={onPriceChange} id="price"/>
                <FormControl label="Quantity" value={formControl.quantity} onChange={onQuantityChange} id="quantity"/>
                <FormControl label="Value" value={formControl.value} onChange={onValueChange} id="value"/>
            </Grid2>
            <Grid2 container mt="32px" justifyContent="flex-end" gap={2}>
                <Button variant="text" sx={{color:'success.primary'}} onClick={closeModal}>Cancel</Button>
                <Button variant="contained" onClick={onSave}>Save</Button>
            </Grid2>
        </Grid2>
    </div>
}