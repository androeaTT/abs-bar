/* 
Status bar for hyprland
Copyright (C) 2026  androeat (dimamazepa9@gmail.com)
*/
import config from "./config.jsx"
import { createBinding } from "ags"
import GLib from 'gi://GLib';
import AHyprland from "gi://AstalHyprland"
import app from "ags/gtk4/app"

export function average(arr) {
    if (!arr || arr.length === 0) return 0
    
    return arr.reduce((sum, num) => sum + num, 0) / arr.length;
}
export function exec(str) {
    return GLib.spawn_async_with_pipes(null, ["/bin/bash", "-c", str], null, 0, null)
}
export function getCurrentMonitor(hypr, gdkmonitor) {
    let result
    hypr.monitors.forEach((e)=> {
        if (e.name == gdkmonitor.connector) { 
            result = e
        }
    })
    return result;
}
export function findWorkspaceById(workspaces, id, monitor) {
    const searchResult = workspaces.get().find((workspace) => workspace.id === id) 
    const dummy = AHyprland.Workspace.dummy(id, monitor)
    return searchResult ? searchResult : dummy
}
export function getWorkspaces(hypr, monitor) {
    const hyprwp = createBinding(hypr, "workspaces") 
    return createComputed(() => {
        let result = []
        hyprwp().forEach((workspace)=>{
            if (workspace.monitor == monitor) {
                result.push(workspace)
            }
        })
        return result.toSorted()
    })
}
export function getWorkspacesRange(hypr, monitor) {
    let currentRange;
    Object.keys(config.WORKSPACES_RANGE_PER_MONITOR).forEach((e)=>{
        if (monitor.name == e) {
            currentRange = config.WORKSPACES_RANGE_PER_MONITOR[e]
        }
    })
    const workspacesAmount = currentRange[1] - currentRange[0] + 1

    const hyprwp = createBinding(hypr, "workspaces") 

    return hyprwp((workspaces) => {
        const result = []
        for (let index = 0; index < workspacesAmount ; index++) {
            result[index] = AHyprland.Workspace.dummy(
                currentRange[0] + index,
                monitor
            )
        }

        workspaces.forEach((workspace)=>{
            if (
                workspace.monitor == monitor &&
                workspace.id >= currentRange[0] &&
                workspace.id <= currentRange[1]
            ) {
                result[workspace.id - currentRange[0]] = workspace
            }
        })

        return result
    })
}
export function getSelectedMonitors() {
    return createBinding(app, "monitors")((i) => {
        let result = []
        config.MONITORS.forEach((e) => result.push(i[e]))
        return result
    })
}