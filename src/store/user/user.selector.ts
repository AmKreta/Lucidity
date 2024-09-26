import { NonInstanceable } from "../../lib/decorators/nonInstancable.decorator";
import { RootState } from "../root.store";

@NonInstanceable()
export class UserSelector{
    static UserRole(rootState:RootState){
        return rootState.user.role;
    }
}