import React, { forwardRef, useImperativeHandle } from "react";
import './formControl.styles.css';
import { useTheme } from "@emotion/react";
import Typography from "@mui/material/Typography";

export interface IFormControl{
    label: string;
    value: string | number;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    id: string;
    required: boolean;
}

export const FormControl:React.ForwardRefExoticComponent<IFormControl & React.RefAttributes<any>> = forwardRef(function({label, value, onChange, id, required = false}, ref){
    const theme:any = useTheme();

    useImperativeHandle(ref,()=>{
        return {
            isInvalid(){
                return !value && required;
            }
        };
    }, [value, required]);

    return <div className="form-control">
        <Typography variant="body2" component={'label'} color="grey.300" htmlFor={id}>{label}</Typography>
        <input className={`${required ? 'invalid' : ''}`} id={id} value={value} onChange={onChange} style={{backgroundColor: theme.palette.grey['700'], color:theme.palette.grey['300']}}/>
    </div>
})