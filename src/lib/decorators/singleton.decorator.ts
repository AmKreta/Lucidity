import { Constructor } from "../../types/types";

export function Singleton(){
    return function<T extends Constructor> (target:T, context:ClassDecoratorContext):T{
        if(context.kind!=='class'){
            throw new Error("Singleton Decorator requires a class got"+typeof(context.kind));
        }
        let instance:any = null;

        return class Singleton extends target {
            constructor(...args: any[]) {
                super(...args);
                if (!instance) {
                    instance = new target(...args);
                    (this as any).context = context;
                }
                return instance;
            }
        };
    }
}