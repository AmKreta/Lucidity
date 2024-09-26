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
   return inventories;
});

export const postSlice = createSlice({
    name:'Inventories',
    initialState,
    reducers:{
        // createPost:(state, action:PayloadAction<IPost>)=>{
        //     const id = Math.random().toString().slice(10);
        //     const post = action.payload;
        //     post.id = id;
        //     state.posts.unshift(post)
        // }
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

export const PostActions = {
    fetchInventories,
    ...postSlice.actions
}

export default postSlice.reducer;