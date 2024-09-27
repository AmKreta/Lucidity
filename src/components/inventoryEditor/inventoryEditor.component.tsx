import { Button, Grid2, IconButton, Typography } from "@mui/material";
import React, { Ref, useEffect, useRef, useState } from "react";
import { IInventory } from "../../types/types";
import { FormControl } from "../formControl/formControl.component";
import './inventoryEditor.styles.css';
import { useAppDispatch } from "../../hooks/store/store.hook";
import { InventoryActions } from "../../store/inventory/inventory.store";
import CloseIcon from '@mui/icons-material/Close';

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
    const [disableSubmit, setDisableSubmit] = useState(false);
    const formControlRefs:Ref<any>[] = [useRef(), useRef(), useRef(), useRef()];

    useEffect(function(){
        setDisableSubmit(formControlRefs.reduce((acc,ref:any)=>ref.current?.isInvalid?.() || acc, false));
    },[formControl]);

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
        <Grid2 className="inventory-editor" sx={{backgroundColor:'grey.800', position:'relative', borderRadius:'16px'}} onClick={e=>e.stopPropagation()}>
            <Button sx={{position:'absolute', top:0, right:0, margin:'8px', minWidth:0, padding:'4px 16px', width:'20px', backgroundColor:'grey.900'}} variant="contained" disableElevation>
                <CloseIcon />
            </Button>
            <Typography variant="h3" color="grey.300" mt="8px">Edit Product</Typography>
            <Typography variant="body1" color="grey.300">{formControl.name}</Typography>
            <Grid2 container gap={2} sx={{marginTop:'24px'}}>
                <FormControl label="Category" value={formControl.category} onChange={onCategoryChange} id="category" required ref={formControlRefs[0]}/>
                <FormControl label="Price" value={formControl.price} onChange={onPriceChange} id="price" required ref={formControlRefs[0]}/>
                <FormControl label="Quantity" value={formControl.quantity} onChange={onQuantityChange} id="quantity" required ref={formControlRefs[0]}/>
                <FormControl label="Value" value={formControl.value} onChange={onValueChange} id="value" required ref={formControlRefs[0]}/>
            </Grid2>
            <Grid2 container mt="32px" justifyContent="flex-end" gap={2}>
                <Button variant="text" sx={{color:'success.main'}} onClick={closeModal} disableElevation>Cancel</Button>
                <Button disabled={disableSubmit} variant="contained" sx={{backgroundColor:'grey.900'}} onClick={onSave} disableElevation>Save</Button>
            </Grid2>
        </Grid2>
    </div>
}