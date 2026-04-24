/* 
Status bar for hyprland
Copyright (C) 2026  androeat (dimamazepa9@gmail.com)
*/
import config from "../config.jsx"
import Gtk from "gi://Gtk?version=4.0"
import { Astal } from "ags/gtk4"


function LeftWindow({children, gdkmonitor}) {
    return (
        <window namespace={config.NAMESPACE} gdkmonitor={gdkmonitor} layer={config.LAYER} exclusivity={Astal.Exclusivity.IGNORE} visible anchor={config.VANCHOR | Astal.WindowAnchor.LEFT}>
                <box class="main-content" orientation={Gtk.Orientation.HORIZONTAL}>
                    <box hexpand={true} class="left" halign={Gtk.Align.START} orientation={Gtk.Orientation.HORIZONTAL}>    
                        {children}
                    </box>
                </box>
        </window>
    )
}
export default LeftWindow