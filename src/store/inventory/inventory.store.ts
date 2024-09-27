import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IInventory } from '../../types/types';
import { InventoryService } from '../../services/inventory.service';

interface IInventoryStore{
    loading:boolean;
    errorMessage: string | null;
    inventories: IInventory[];
}

const initialState:IInventoryStore = {
    loading:false,
    errorMessage:null,
    inventories: []
}

const fetchInventories = createAsyncThunk("[Inventory FetchInventories]", async (_, thunkApi:any) => {
   const inventoryService = new InventoryService();
   const inventories:any = await inventoryService.getInventory();
   const res = await inventories.json();
   return res.map((product:IInventory)=>({...product, id: Math.random().toString().slice(8)}));
});

export const postSlice = createSlice({
    name:'Inventories',
    initialState,
    reducers:{
        updateInventory(state, action:PayloadAction<IInventory<''>>){
            const newInventory = action.payload;
            const id = action.payload.id;
            const indexOldInventory = state.inventories.findIndex(inventory=>inventory.id===id);
            state.inventories[indexOldInventory] = {
                ...newInventory,
                value:`$${newInventory.value}`,
                price: `$${newInventory.price}`,
                quantity: Number(newInventory.quantity),
            };
        },
        deleteInventory(state, action:PayloadAction<IInventory['id']>){
            const id = action.payload;
            const indexInventory = state.inventories.findIndex(inventory=>inventory.id===id);
            state.inventories.splice(indexInventory, 1);
        },
        toggleInventoryDisable(state, action:PayloadAction<IInventory['id']>){
            const id = action.payload;
            const indexInventory = state.inventories.findIndex(inventory=>inventory.id===id);
            state.inventories[indexInventory].disabled = !state.inventories[indexInventory].disabled;
        }
    },
    extraReducers(builder){
        builder.addCase(fetchInventories.pending, (state) => {
            state.loading = false;
        });
        builder.addCase(fetchInventories.fulfilled, (state, action:PayloadAction<any>) => {
            state.loading = false;
            state.inventories = action.payload;
        });
        builder.addCase(fetchInventories.rejected, (state) => {
           state.errorMessage = "Unable to fetch Inventories";
           state.loading = false;
        });
    }
});

export const InventoryActions = {
    fetchInventories,
    ...postSlice.actions
}

export default postSlice.reducer;