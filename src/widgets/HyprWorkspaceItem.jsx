/* 
Status bar for hyprland
Copyright (C) 2026  androeat (dimamazepa9@gmail.com)
*/
import { createBinding } from "ags"
import AApps from "gi://AstalApps"
import Gtk from "gi://Gtk?version=4.0"


function HyprWorkspacesItem({workspace}) {
    const isClientsExists = createBinding(workspace, "clients")((e)=>!!e[0])
    const clientBind =      createBinding(workspace, "clients")

    const apps = new AApps.Apps
    const applist = createBinding(apps, "list")
    const icon = isClientsExists((e) => {
        if (!e) {
            return ""
        }
        const app = applist().find(app => (app.entry ? app.entry.replace(/\.desktop$/, ""): "") == clientBind()[0].initialClass )
        if (app) {
            return app.iconName
        }
        return "application-x-executable-symbolic"
    }) 
    
    
    return (
        <button 
            iconName={ isClientsExists((e)=> e ? icon() : "dot-symbolic" )} 
            onClicked={() => workspace.focus()} 
            halign={Gtk.Align.CENTER} 
            class="circular flat" 
        />
    )
}
export default HyprWorkspacesItem