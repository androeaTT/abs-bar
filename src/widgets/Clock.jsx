/* 
Status bar for hyprland
Copyright (C) 2026  androeat (dimamazepa9@gmail.com)
*/
import Gtk from "gi://Gtk?version=4.0"
import { createPoll } from "ags/time"


function Clock() {
    const clock = createPoll("", 1000, "date +%I:%M")

    return (
        <menubutton class="flat circular ">
            <label class="clock" label={clock}></label>
            <popover>
                <Gtk.Calendar />
            </popover>
        </menubutton>
    )
}
export default Clock