/* 
Status bar for hyprland
Copyright (C) 2026  androeat (dimamazepa9@gmail.com)
*/
import { createState, createBinding } from "ags"
import { property, register } from "ags/gobject"
import GObject from "gi://GObject?version=2.0"

@register()
class GlobalStateManager extends GObject.Object {
    @property(Boolean)  isCavaShowed = false
    @property(Boolean)  isWorkspacesChanging = false
    @property(Number)   currentWorkspace = 1
    constructor(){
        super()
        this.isCavaShowedBind               = createBinding(this, "isCavaShowed")
        this.currentWorkspaceBind           = createBinding(this, "currentWorkspace")
        this.isWorkspacesChangingBind       = createBinding(this, "isWorkspacesChanging")
    }
}
export const state = new GlobalStateManager()