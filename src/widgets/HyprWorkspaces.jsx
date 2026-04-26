/* 
Status bar for hyprland
Copyright (C) 2026  androeat (dimamazepa9@gmail.com)
*/
import AHyprland from "gi://AstalHyprland"
import { getCurrentMonitor, getWorkspaces, getWorkspacesRange, findWorkspaceById } from "../utils.jsx"
import { For, createBinding } from "ags"
import { state } from "../GlobalStateManager.jsx"
import GLib from 'gi://GLib';
import Gtk from "gi://Gtk?version=4.0"
import config from "../config";
import Card from "./Card.jsx";
import HyprWorkspacesItem from "./HyprWorkspaceItem.jsx"
import HyprWorkspacesPointer from "./HyprWorkspacesPointer.jsx"

function HyprWorkspaces({gdkmonitor, inState}) {
    const hypr = AHyprland.Hyprland.get_default()
    const monitor = getCurrentMonitor(hypr, gdkmonitor)
    const workspaces = config.IS_WORKSPACES_DYNAMIC ? getWorkspaces(hypr, monitor) : getWorkspacesRange(hypr, monitor)

    const hyprFocusedWpBind = createBinding(hypr,"focused-workspace")
    hyprFocusedWpBind()
    hyprFocusedWpBind.subscribe(() => { hyprFocusedWpBind.get() && (state.currentWorkspace = hyprFocusedWpBind.get().id) })

    let timeoutId
    state.currentWorkspaceBind.subscribe(() => {
        const currentWp = findWorkspaceById(workspaces, state.currentWorkspace, monitor)
        inState.isCurrentWorkspaceEmpty = currentWp.clients.length === 0

        state.isWorkspacesChanging = true

        if (timeoutId) {
            GLib.source_remove(timeoutId)
        }
        timeoutId = GLib.timeout_add(GLib.PRIORITY_DEFAULT, 1000, () => {
            state.isWorkspacesChanging = false
            
            timeoutId = undefined
            return GLib.SOURCE_REMOVE
        })

    })


    return ( 
        <Card>
            <overlay>
                <box class="linked" orientation={Gtk.Orientation.HORIZONTAL}>
                    <For each={workspaces}>
                        {(e)=>(
                            <HyprWorkspacesItem workspace={e} />
                        )}
                    </For>
                </box>
                <HyprWorkspacesPointer $type={"overlay"} monitor={monitor} hypr={hypr} workspaces={workspaces} />
            </overlay>
        </Card>
    )
}
export default HyprWorkspaces