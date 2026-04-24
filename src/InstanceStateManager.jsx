/* 
Status bar for hyprland
Copyright (C) 2026  androeat (dimamazepa9@gmail.com)
*/
import { createState, createBinding } from "ags"
import { property, register } from "ags/gobject"
import GObject from "gi://GObject?version=2.0"

@register()
class InstanceStateManager extends GObject.Object {
    @property(Boolean)  isCurrentWorkspaceEmpty = false
    
    constructor(){
        super()
        
        this.isCurrentWorkspaceEmptyBind    = createBinding(this, "isCurrentWorkspaceEmpty")
    }
}
export default InstanceStateManager