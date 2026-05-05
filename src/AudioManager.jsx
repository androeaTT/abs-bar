import { createState, createBinding } from "ags"
import { property, register, getter } from "ags/gobject"

import GObject  from "gi://GObject?version=2.0"
import AWp     from "gi://AstalWp"

@register()
class AudioManager extends GObject.Object{
    #wp
    
    @property(String) iconName = ""
    #setupIconName(){
        const volumeIcon = createBinding(this.#wp.get_default_speaker(), "volume-icon")
        
        volumeIcon()
        volumeIcon.subscribe(()=>{
            this.iconName = volumeIcon.get()
        })
    }

    constructor(){
        super()

        this.#wp = AWp.Wp.get_default()
        this.#setupIconName()
    }
}
const audioManager = new AudioManager()
export default audioManager