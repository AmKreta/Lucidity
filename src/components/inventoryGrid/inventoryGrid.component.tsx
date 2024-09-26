import React, { useState } from "react";
import { IInventory } from "../../types/types";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {Chip} from '../chip/chip.component';
import { useTheme } from "@emotion/react";
import { Modal, Stack, Typography } from "@mui/material";
import {InventoryEditor} from '../inventoryEditor/inventoryEditor.component';
import './inventoryGrid.styles.css';

interface IInventoryGrid {
    inventories: IInventory[]
}

export const InventoryGrid: React.FC<IInventoryGrid> = function ({ inventories }) {
    const theme:any= useTheme();
    const [disabledProducts, setDisabledProducts] = useState(new Set<IInventory['id']>());
    const [activeProductModal, setActiveProductModal] = useState<null | IInventory>(null);

    function toggleDisabledProducts(id:string){
        setDisabledProducts(prevState=>{
            if(prevState.has(id)){
                prevState.delete(id);
            }
            else{
                prevState.add(id);
            }
            return new Set(prevState);
        })
    }

    function onModalClose(){
        setActiveProductModal(null);
    }

    function onDelete(){

    }
    
    return <table className="inventoryGrid" style={{backgroundColor:theme.palette.grey['800']}}>
        <colgroup>
                <col span={5}></col>
                <col style={{width:'120px'}}></col>
        </colgroup>
        <thead>
            <tr style={{borderBottom:`.5px solid ${theme.palette.grey['600']}`}}>
                {['Name', 'Category', 'Price', 'Quantity', 'value'].map(heading => <th key={heading}>
                    <Chip>
                        <Typography variant="body2">{heading}</Typography>
                    </Chip>
                </th>)}
                <th style={{textAlign:'center', position:'relative', right:'5px'}}>
                    <Chip>
                        <Typography variant="body2">Action</Typography>
                    </Chip>
                </th>
            </tr>
        </thead>
        <tbody>
            {
                inventories.map((inventory) => <tr key={inventory.id} style={{borderBottom:`.5px solid ${theme.palette.grey['600']}`}}>
                    {
                        Object.keys(inventory).map((key, index) => <td key={index}>
                            <Typography variant="body2" sx={{color: 'grey.300'}}>
                                {(inventory as any)[key]}
                            </Typography>
                        </td>)
                    }
                    <td className="grid-actions">
                    <Stack direction="row" spacing={1}>
                        <EditIcon sx={{color:'success.light'}} className={`${disabledProducts.has(inventory.id)? 'disabled': ''}`} onClick={()=>setActiveProductModal(inventory)}/> 
                        {
                            disabledProducts.has(inventory.id)
                                ? <VisibilityOffIcon sx={{color:'info.dark'}} onClick={()=>toggleDisabledProducts(inventory.id)}/>
                                : <RemoveRedEyeIcon sx={{color:'info.dark'}} onClick={()=>toggleDisabledProducts(inventory.id)}/> 
                        }
                        <DeleteIcon sx={{color:'error.dark'}} className={`${disabledProducts.has(inventory.id)? 'disabled': ''}`} />
                    </Stack>
                    </td>
                </tr>)
            }
        </tbody>
        <Modal open={!!activeProductModal} onClose={onModalClose}>
            <InventoryEditor selectedProduct={activeProductModal!} closeModal={onModalClose}/>
        </Modal>
    </table>
}