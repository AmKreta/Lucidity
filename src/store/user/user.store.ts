import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { USER_ROLES } from '../../types/user-role.enum';

interface IInventoryStore{
   role: USER_ROLES
}

const initialState:IInventoryStore = {
    role: USER_ROLES.ADMIN
}


export const userSlice = createSlice({
    name:'USER',
    initialState,
    reducers:{
        changeUserRole(state, action:PayloadAction<USER_ROLES>){
            state.role = action.payload;
        },
    }
});

export const UserActions = {
    ...userSlice.actions
}

export default userSlice.reducer;