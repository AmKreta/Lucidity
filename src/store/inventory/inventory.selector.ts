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
}