/* 
Status bar for hyprland
Copyright (C) 2026  androeat (dimamazepa9@gmail.com)
*/
import { exec } from "./utils.jsx"
import { state } from "./GlobalStateManager.jsx"
import { createBinding } from "ags"
import Gtk from "gi://Gtk?version=4.0"
import InstanceStateManager from "./InstanceStateManager.jsx"



//widgets
import LeftWindow from "./windows/LeftWindow.jsx"
import CenterWindow from "./windows/CenterWindow.jsx"
import RightWindow from "./windows/RightWindow.jsx"
import Card from "./widgets/Card.jsx"
import Tray from "./widgets/Tray.jsx"
import Clock from "./widgets/Clock.jsx"
import NotificationsButton from "./widgets/NotificationButton.jsx"
import Separator from "./widgets/Separator.jsx"
import cavaManager from "./CavaManager.jsx"
import HyprWorkspaces from "./widgets/HyprWorkspaces.jsx"

function BarInstance({gdkmonitor}) {
    const inState = new InstanceStateManager()
    return (
        <LeftWindow gdkmonitor={gdkmonitor}>
            <Card>
                <box valign={Gtk.Align.CENTER}>
                    <button 
                        onClicked={() => exec("hyprctl dispatch exec \"anyrun\" ")} 
                        iconName="circle-filled-symbolic" 
                        valign={Gtk.Align.CENTER} 
                        class="flat circular" 
                    />
                </box>
            </Card>
        </LeftWindow>,
        <CenterWindow inState={inState} gdkmonitor={gdkmonitor}>
            <HyprWorkspaces inState={inState} gdkmonitor={gdkmonitor} />
        </CenterWindow>,
        <RightWindow gdkmonitor={gdkmonitor}>
            {cavaManager.Widget}
            <Card classes={ createBinding(cavaManager, "isSilence")( (e) => 
                "linked card" + (e ? "" : " card-con-left")
            )}>
                <Tray />
                <Separator />
                <NotificationsButton />
                <Separator />
                <Clock />
            </Card>
        </RightWindow>
    )
}
export default BarInstance