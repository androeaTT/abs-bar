import { createComputed, createBinding, createEffect } from "ags"
import { createPoll } from "ags/time"
import { property, register, getter } from "ags/gobject"

import GObject  from "gi://GObject?version=2.0"

let defaultWarpManager = null
export function getWarpManager(){
    return defaultWarpManager ??= new WarpManager()
}

@register()
export default class WarpManager extends GObject.Object{
    @property(String) status = ""
    #setupStatus(){
        let status = createPoll("", 500, "warp-cli status")(
            (p) => p
                ?.split('\n')[0]
                ?.split(':')[1]
                ?.trim()
        )
        

        createEffect(()=>{
            this.status = status()
        })
    }

    
    @property(String) iconName = ""
    #setupIconName(){
        const status = createBinding(this, "status")
        let icon = createComputed(
            () => 
                status() == "Disconnected" ? "network-shield-crossed-symbolic" :
                status() == "Connecting"   ? "network-shield-dots-symbolic"    :
                status() == "Unable"       ? "network-vpn-no-route-symbolic"   :
                status() == "Connected"    ? "network-shield-symbolic"         : 
                ""
        ) 

        createEffect(()=>{
            this.iconName = icon()
        })
    }


    constructor(){
        super()
        
        this.#setupStatus()
        this.#setupIconName()

        

    }
}