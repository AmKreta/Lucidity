import { Constructor } from "../../types/types";

export function NonInstanceable(){
    return function<T extends Constructor> (target:T, context:ClassDecoratorContext):T{
        if(context.kind!=='class'){
            throw new Error("NoInstance Decorator requires a class got"+typeof(context.kind));
        }
        return class NoInstance extends target {
            constructor(...args: any[]) {
                super(...args);
               throw new Error(`class ${context.name} cannot be instantiated`);
            }
        };
    }
}