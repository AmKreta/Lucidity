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
    const inventoryTotalProducts = useAppSelector(InventorySelector.totalProducts);
    const inventoryStoreValue = useAppSelector(InventorySelector.totalStoreValue);
    const inventoryTotalOutOfStock = useAppSelector(InventorySelector.OutOfStock);
    const inventoryNumCategories = useAppSelector(InventorySelector.NumCategories);

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
            <DashboardCard title="Total products" Icon={ShoppingCartIcon} value={inventoryTotalProducts}/>
            <DashboardCard title="Total store value" Icon={CurrencyExchangeIcon} value={inventoryStoreValue}/>
            <DashboardCard title="Out of stock" Icon={RemoveShoppingCartIcon} value={inventoryTotalOutOfStock}/>
            <DashboardCard title="No of Categories" Icon={CategoryIcon} value={inventoryNumCategories}/>
        </Grid>
    </Container>;
}