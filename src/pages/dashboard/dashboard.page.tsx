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
import Switch from '@mui/material/Switch'
import Stack from '@mui/material/Stack'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { InventoryGrid } from "../../components/inventoryGrid/inventoryGrid.component";

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

    // if(inventoryErrorMessage){
    //     return <div>{inventoryErrorMessage}</div>
    // }

    // if(inventoriesLoading){
    //     return <div>{inventoriesLoading}</div>
    // }


    return <Container fixed sx={{height:'100%', minWidth:'100%', backgroundColor:'grey.900', position:'relative'}}>
        <Stack direction="row" spacing={1} alignItems="center" position="absolute" top={0} right={0} m='16px 32px'>
            <Typography color="grey.300" variant="body2">Admin</Typography>
            <Switch color="success"/>
            <Typography color="grey.300" variant="body2">User</Typography>
            <ExitToAppIcon sx={{color: "grey.300"}}/>
        </Stack>
        <Typography variant="h3" color="grey.300" sx={{paddingTop:'48px'}}>Inventory Stats</Typography>
        <Grid container spacing={2} alignItems="center" justifyContent="flex-start" my="32px">
            <DashboardCard title="Total products" Icon={ShoppingCartIcon} value={inventoryTotalProducts}/>
            <DashboardCard title="Total store value" Icon={CurrencyExchangeIcon} value={inventoryStoreValue}/>
            <DashboardCard title="Out of stock" Icon={RemoveShoppingCartIcon} value={inventoryTotalOutOfStock}/>
            <DashboardCard title="No of Categories" Icon={CategoryIcon} value={inventoryNumCategories}/>
        </Grid>
        <InventoryGrid inventories={inventories}/>
    </Container>;
}