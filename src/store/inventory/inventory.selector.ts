import { NonInstanceable } from "../../lib/decorators/nonInstancable.decorator";
import { RootState } from "../root.store";

@NonInstanceable()
export class InventorySelector{

    static Inventories(root:RootState){
        return root.inventory.inventories;
    }

    static ErrorMessage(root:RootState){
        return root.inventory.errorMessage;
    }

    static Loading(root:RootState){
        return root.inventory.loading;
    }

    static DisabledInventoryIdSet(root:RootState){
        const disabledIds = root.inventory.inventories.reduce((acc:string[],inventory)=>{
            inventory.disabled && acc.push(inventory.id);
            return acc;
        },[]);
        return new Set(disabledIds);
    }

    static totalProducts(root:RootState){
        return root.inventory.inventories.reduce((acc, item)=>acc+item.quantity, 0);
    }

    static totalStoreValue(root:RootState){
        return root.inventory.inventories.reduce((acc, item)=>{
            const price = Number(item.price.slice(1));
            return isNaN(price)? acc : acc + price;
        }, 0);
    }

    static OutOfStock(root:RootState){
        return root.inventory.inventories.filter(item=>item.quantity===0).length;
    }

    static NumCategories(root:RootState){
        return root.inventory.inventories.reduce((acc, item)=>{
            acc.add(item.category);
            return acc;
        }, new Set<string>()).size;
    }
}