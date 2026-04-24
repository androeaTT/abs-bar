/* 
Status bar for hyprland
Copyright (C) 2026  androeat (dimamazepa9@gmail.com)
*/
import config from "../config.jsx"
import { createState } from "ags"
import { state } from "../GlobalStateManager.jsx"

import AHyprland from "gi://AstalHyprland"
import GLib from 'gi://GLib'
import Gtk from "gi://Gtk?version=4.0"
function CenterWindow({children, gdkmonitor, inState}) {
    const [isOpaque, setIsOpaque] = createState(false)
    const [winLayer, setWinLayer] = createState(config.LAYER)

    const hypr = AHyprland.Hyprland.get_default()


    let timeoutId
    function changeLayerTo(layer) {
        setIsOpaque(true)
        if (timeoutId) {
            GLib.source_remove(timeoutId)
        }
        timeoutId = GLib.timeout_add(GLib.PRIORITY_DEFAULT, 150, () => {
            setWinLayer(layer)
            setIsOpaque(false)
            
            
            timeoutId = undefined
            return GLib.SOURCE_REMOVE
        })
    }

    const window = (
        <window namespace={config.NAMESPACE} gdkmonitor={gdkmonitor} layer={winLayer} exclusivity={config.EXCLUSIVITY} visible anchor={config.VANCHOR}>
            <box class={isOpaque((e) => e ? "main-content hidden" : "main-content")} orientation={Gtk.Orientation.HORIZONTAL}>
                <box hexpand={true} class="center" halign={Gtk.Align.CENTER} orientation={Gtk.Orientation.HORIZONTAL}>    
                    {children}
                </box>
            </box>
        </window>
    )

    state.isWorkspacesChangingBind()
    state.isWorkspacesChangingBind.subscribe(() => {
        if (inState.isCurrentWorkspaceEmpty){
            if (state.isWorkspacesChanging) {
                setWinLayer(config.WORKSPACE_ON_CHANGING_LAYER)
            } else {
                setWinLayer(config.LAYER)
            }   
        } else {
            if (state.isWorkspacesChanging) {
                changeLayerTo(config.WORKSPACE_ON_CHANGING_LAYER)
            } else {
                changeLayerTo(config.LAYER)
            }
        }
    })

    return window
}
export default CenterWindow