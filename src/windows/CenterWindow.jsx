/* 
Status bar for hyprland
Copyright (C) 2026  androeat (dimamazepa9@gmail.com)
*/
import config from "../config.jsx"
import { createState, createBinding } from "ags"
import { state } from "../GlobalStateManager.jsx"

import AHyprland from "gi://AstalHyprland"
import { Astal } from "ags/gtk4"
import GLib from 'gi://GLib'
import Gtk from "gi://Gtk?version=4.0"
function CenterWindow({children, gdkmonitor, inState}) {
    const [isOpaque, setIsOpaque] = createState(false)
    const [winLayer, changeLayerSilent] = createState(config.LAYER)
    const [isWindowOnTop, setIsWindowOnTop] = createState(false)

    const hypr = AHyprland.Hyprland.get_default()


    let timeoutId
    function changeLayerAnimated(layer) {
        setIsOpaque(true)
        if (timeoutId) {
            GLib.source_remove(timeoutId)
        }
        timeoutId = GLib.timeout_add(GLib.PRIORITY_DEFAULT, 150, () => {
            changeLayerSilent(layer)
            setIsOpaque(false)
            
            
            timeoutId = undefined
            return GLib.SOURCE_REMOVE
        })
    }

    const mouseController = new Gtk.EventControllerMotion()
    const isContainsPointerBind = createBinding(mouseController, "contains-pointer")

    const window = (
        <window 
            namespace={config.NAMESPACE} 
            gdkmonitor={gdkmonitor} 
            overflow={Gtk.Overflow.HIDDEN} 
            layer={winLayer} 
            exclusivity={config.EXCLUSIVITY} 
            visible 
            anchor={config.VANCHOR}
        >
            <box 
                class={ isOpaque((e) => e ? "main-content hidden" : "main-content") } 
                overflow={Gtk.Overflow.HIDDEN} 
                halign={Gtk.Align.CENTER} 
                orientation={Gtk.Orientation.HORIZONTAL}
            >
                <box 
                    hexpand={true} 
                    class="center" 
                    halign={Gtk.Align.CENTER} 
                    overflow={Gtk.Overflow.HIDDEN} 
                    orientation={Gtk.Orientation.HORIZONTAL}
                >    
                    {children}
                </box>
            </box>
        </window>
    )

    window.add_controller(mouseController)

    isWindowOnTop.subscribe(() => {
        if (inState.isCurrentWorkspaceEmpty){
            if (isWindowOnTop.get()) {
                changeLayerSilent(Astal.Layer.TOP)
            } else {
                changeLayerSilent(config.LAYER)
            }   
        } else {
            if (isWindowOnTop.get()) {
                changeLayerAnimated(Astal.Layer.TOP)
            } else {
                changeLayerAnimated(config.LAYER)
            }
        }
    })


    state.isWorkspacesChangingBind()
    state.isWorkspacesChangingBind.subscribe(() => {
        if (!mouseController.containsPointer) {
            setIsWindowOnTop(state.isWorkspacesChanging)
        }
    })

    isContainsPointerBind()
    isContainsPointerBind.subscribe(() => {
        setIsWindowOnTop(mouseController.containsPointer)
    })

    return window
}
export default CenterWindow