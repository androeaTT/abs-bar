import { property, register, getter } from "ags/gobject"
import { createBinding } from "ags"


import Gtk from "gi://Gtk?version=4.0"

import audioManager from "../AudioManager.jsx"
import { getNetworkManager } from "../NetworkManager.jsx"
import { getWarpManager } from "../WarpManager.jsx"

@register()
class StatusBar extends Gtk.Button {
    constructor() {
        super()
        this.add_css_class("flat")
        this.add_css_class("status-icon")
        const box = (
            <box spacing={10} orientation={Gtk.Orientation.HORISONTAL}>
                <image iconName={createBinding(getNetworkManager(), "icon-name")} />
                <image iconName={createBinding(audioManager,        "icon-name")} />
                <image iconName={createBinding(getWarpManager(),    "icon-name")} />
            </box>
        )
        this.set_child(box)

    }
}
export default StatusBar