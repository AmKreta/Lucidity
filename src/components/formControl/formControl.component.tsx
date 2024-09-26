import React from "react";
import './formControl.styles.css';
import { useTheme } from "@emotion/react";
import { Typography } from "@mui/material";

export interface IFormControl{
    label: string;
    value: string | number;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    id: string;
}

export const FormControl:React.FC<IFormControl> = function({label, value, onChange, id}){
    const theme:any = useTheme();

    return <div className="form-control">
        <Typography variant="body2" component={'label'} color="grey.300">{label}</Typography>
        <input value={value} onChange={onChange} style={{backgroundColor: theme.palette.grey['700'], color:theme.palette.grey['300']}}/>
    </div>
}