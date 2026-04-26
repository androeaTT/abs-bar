/* 
Status bar for hyprland
Copyright (C) 2026  androeat (dimamazepa9@gmail.com)
*/
import Gtk from "gi://Gtk?version=4.0"

function Card({children, width_request, classes="mcard linked"}) {
  return(
    <box vexpand={true} width_request={width_request} class={classes} orientation={Gtk.Orientation.HORIZONTAL}> 
        {children}
    </box>
  )
}
export default Card