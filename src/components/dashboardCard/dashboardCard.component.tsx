import React from "react";
import './dashboardCard.stylles.css';
import { Card, SvgIconTypeMap, Typography } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

interface IDashboardCard{
    Icon:OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; };
    title:string;
    value: string | number;
}

export const DashboardCard:React.FC<IDashboardCard> =  function DashboardCard({Icon, title, value}){
    return <Card sx={{display:'flex', backgroundColor:'success.dark', color:'grey.300', padding:'16px', gap:'16px', flexGrow:1}}>
            <Icon />
        <div>
            <Typography variant="body2" sx={{marginBottom:'8px'}}>{title}</Typography>
            <Typography variant="h5">{value}</Typography>
        </div>
    </Card>
}