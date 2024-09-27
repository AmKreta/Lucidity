import React, { useState } from "react";
import { IInventory } from "../../types/types";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {Chip} from '../chip/chip.component';
import { useTheme } from "@emotion/react";
import {InventoryEditor} from '../inventoryEditor/inventoryEditor.component';
import { useDispatch } from "react-redux";
import { InventoryActions } from "../../store/inventory/inventory.store";
import { useAppSelector } from "../../hooks/store/store.hook";
import { InventorySelector } from "../../store/inventory/inventory.selector";
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";
import './inventoryGrid.styles.css';
import { UserSelector } from "../../store/user/user.selector";
import { USER_ROLES } from "../../types/user-role.enum";

interface IInventoryGrid {
    inventories: IInventory[]
}

export const InventoryGrid: React.FC<IInventoryGrid> = function ({ inventories }) {
    const theme:any= useTheme();
    const dispatch = useDispatch();
    const disabledIncentoryIdSet = useAppSelector(InventorySelector.DisabledInventoryIdSet);
    const currentUserRole = useAppSelector(UserSelector.UserRole);
    const [activeProductModal, setActiveProductModal] = useState<null | IInventory>(null);

    function toggleDisabledProducts(id:string){
        dispatch(InventoryActions.toggleInventoryDisable(id));
    }

    function onModalClose(){
        setActiveProductModal(null);
    }

    function onDelete(id:string){
        dispatch(InventoryActions.deleteInventory(id))
    }

    function disableInventory(id:string){
        return (currentUserRole === USER_ROLES.USER) || disabledIncentoryIdSet.has(id);
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
                inventories.map((inventory) => <tr key={inventory.id} style={{borderBottom:`.5px solid ${theme.palette.grey['600']}`}} className={`${disableInventory(inventory.id) ? 'row-disabled':''}`}>
                    {
                        ["name", "category", "price", "quantity", "value"].map((key, index) => <td key={index}>
                            <Typography variant="body2" sx={{color: 'grey.300'}}>
                                {(inventory as any)[key]}
                            </Typography>
                        </td>)
                    }
                    <td className="grid-actions">
                        <Stack direction="row" spacing={1}>
                            <EditIcon sx={{color:'success.light'}} className={`${disableInventory(inventory.id)? 'disabled': ''}`} onClick={()=>setActiveProductModal(inventory)}/> 
                            {
                                disableInventory(inventory.id)
                                    ? <VisibilityOffIcon sx={{color:'info.dark'}} onClick={()=>toggleDisabledProducts(inventory.id)}/>
                                    : <RemoveRedEyeIcon sx={{color:'info.dark'}} onClick={()=>toggleDisabledProducts(inventory.id)}/> 
                            }
                            <DeleteIcon sx={{color:'error.dark'}} className={`${disableInventory(inventory.id)? 'disabled': ''}`} onClick={()=>onDelete(inventory.id)}/>
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