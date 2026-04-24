/* 
Status bar for hyprland
Copyright (C) 2026  androeat (dimamazepa9@gmail.com)
*/
import ATray from "gi://AstalTray"
import Gtk from "gi://Gtk?version=4.0"
import { Astal } from "ags/gtk4"
import config from "../config.jsx"
import { For, createBinding } from "ags"
import TrayItem from "./TrayItem.jsx"


function Tray() {
    const atray = ATray.get_default()

    return (
        <menubutton class="flat" direction={config.VANCHOR == Astal.WindowAnchor.TOP ? Gtk.ArrowType.DOWN : Gtk.ArrowType.UP }>
            <popover>
                <box orientation={Gtk.Orientation.HORIZONTAL}>
                    <For each={createBinding(atray, "items")}>
                        {(item, number) => (
                            <TrayItem item={item} /> 
                        )}
                    </For>
                </box>
            </popover>
        </menubutton>
    )
}
export default Tray