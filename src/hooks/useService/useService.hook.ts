import { InventoryService } from "../../services/inventory.service";

enum SERVICE_INJECTION_TOKEN {
    INVENTORY_SERVICE
}

const SERVICES = {
    [SERVICE_INJECTION_TOKEN.INVENTORY_SERVICE] : new InventoryService()
}

export default function useService(serviceInjectionToken: SERVICE_INJECTION_TOKEN){
    return SERVICES[serviceInjectionToken];
}