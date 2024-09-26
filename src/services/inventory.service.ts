import { Singleton } from "../lib/decorators/singleton.decorator";

@Singleton()
export class InventoryService{

    rootURL = 'https://dev-0tf0hinghgjl39z.api.raw-labs.com';

    getInventory(){
        return fetch(`${this.rootURL}/inventory`)
    }
}