/* 
Status bar for hyprland
Copyright (C) 2026  androeat (dimamazepa9@gmail.com)
*/
import { exec } from "../utils.jsx"

function NotificationsButton() {
    return (
        <button class="flat" onClicked={() => exec("swaync-client -t")} iconName="bell-outline-symbolic" />
    )
}
export default NotificationsButton