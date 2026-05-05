import { createState, createBinding, createEffect } from "ags"
import { property, register, getter } from "ags/gobject"

import GObject  from "gi://GObject?version=2.0"
import ANetwork     from "gi://AstalNetwork"

let defaultNetworkManager = null
export function getNetworkManager(){
    return defaultNetworkManager ??= new NetworkManager()
}

@register()
export default class NetworkManager extends GObject.Object{
    #network
    
    @property(String) iconName = ""
    #setupIconName(){
        const wiredIcon =       createBinding(this.#network.wired,  "icon-name")
        const wirelessIcon =    createBinding(this.#network.wifi,   "icon-name")

        createEffect(()=>{
            this.#network.primary === ANetwork.Primary.WIRED && (
                this.iconName = wiredIcon()
            )
            wiredIcon()
        })

        createEffect(()=>{
            this.#network.primary === ANetwork.Primary.WIFI && (
                this.iconName = wirelessIcon()
            )
            wirelessIcon()
        })
    }

    constructor(){
        super()
        this.#network  = ANetwork.Network.get_default()

        this.#setupIconName()

        

    }
}
