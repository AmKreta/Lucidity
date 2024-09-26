import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store/store.hook";
import { InventorySelector } from "../../store/inventory/inventory.selector";
import { InventoryActions } from "../../store/inventory/inventory.store";
import { DashboardCard } from "../../components/dashboardCard/dashboardCard.component";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import CategoryIcon from '@mui/icons-material/Category';
import Grid from '@mui/material/Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function Dashboard(){

    const inventories = useAppSelector(InventorySelector.Inventories);
    const inventoryErrorMessage = useAppSelector(InventorySelector.ErrorMessage);
    const inventoriesLoading = useAppSelector(InventorySelector.Loading);
    const dispatch = useAppDispatch();

    useEffect(function(){
        //dispatch(InventoryActions.fetchInventories() as any);
    },[]);

    console.log(inventories);

    // if(inventoryErrorMessage){
    //     return <div>{inventoryErrorMessage}</div>
    // }

    // if(inventoriesLoading){
    //     return <div>{inventoriesLoading}</div>
    // }


    return <Container maxWidth="lg" sx={{height:'100%', backgroundColor:'grey.900'}}>
        <Typography variant="h3" color="grey.300" sx={{paddingTop:'16px'}}>Inventory Stats</Typography>
        <Grid container spacing={2} alignItems="center" justifyContent="flex-start" py='16px'>
            <DashboardCard title="Total products" Icon={ShoppingCartIcon} value="30000"/>
            <DashboardCard title="Total store value" Icon={CurrencyExchangeIcon} value="30000"/>
            <DashboardCard title="Out of stock" Icon={RemoveShoppingCartIcon} value="100"/>
            <DashboardCard title="No of Categories" Icon={CategoryIcon} value="3000"/>
        </Grid>
    </Container>;
}