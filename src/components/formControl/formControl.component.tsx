import React from "react";
import './formControl.styles.css';

export interface IFormControl{
    label: string;
    value: string | number;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    id: string;
}

export const FormControl:React.FC<IFormControl> = function({label, value, onChange, id}){
    return <div className="form-control">
        <label htmlFor={id}>{label}</label>
        <input value={value} onChange={onChange} />
    </div>
}