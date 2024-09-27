export type Constructor = {new(...args:any[]):{}};

export enum INVENTORY_CATEGORIES{
    ELECTRONIC = 'Electronic',
    PHONE = 'Phone'
};

export type Currency<T extends string> = `${T}${string}`;

export interface IInventory<CURRENCY extends string = '$'>{
    name: string;
    category: INVENTORY_CATEGORIES;
    value: Currency<CURRENCY>;
    quantity: number;
    price: Currency<CURRENCY>;
    id:string;
    disabled?:boolean;
}