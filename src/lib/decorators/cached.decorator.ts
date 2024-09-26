import { Constructor } from "../../types/types";

export function Cached(){
    let lastArgs:any[] = [];
    let lastVal:any = null;

    return function<This extends Constructor, Args extends any[], Return, Target extends (this: This, ...args: Args) => Return>(target:Target, context:ClassMethodDecoratorContext<This, Target>){
        return function(this:This, ...args:Args){
            let returnCachedValue = true;
            if(arguments.length!==args.length){
                returnCachedValue = false;
            }
            else{
                for(let i in arguments){
                    if(lastArgs[i]!=arguments[i]){
                        returnCachedValue = false;
                        break;
                    }
                }
            }

            if(returnCachedValue){
                return lastVal;
            }
            
            const result = target.call(this, ...args);
            lastArgs = args;
            return lastVal = result;
        }
    }
}