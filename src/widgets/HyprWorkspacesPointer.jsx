/* 
Status bar for hyprland
Copyright (C) 2026  androeat (dimamazepa9@gmail.com)
*/
import Gtk from "gi://Gtk?version=4.0"
import Adw from "gi://Adw?version=1"
import { findWorkspaceById } from "../utils.jsx"
import { state } from "../GlobalStateManager.jsx"

function HyprWorkspacesPointer({hypr, workspaces, monitor}) {
    function getFocusedWpCords(focusedWpIndex, fixed, workspacesAmount, pointerWidth, pointerHeight, valign, margin) {
        const parentWidth = fixed.get_width()
        const parentHeight = fixed.get_height()

        const wpWidth = parentWidth / workspacesAmount
        const x = (wpWidth * focusedWpIndex - 1) + (wpWidth / 2 - pointerWidth / 2) + 1

        const wpHalf = parentHeight / 2 
        const y =   
            valign === Gtk.Align.START  ? 
                margin                  :
            valign === Gtk.Align.CENTER ?
                wpHalf - 
                pointerHeight / 2       :
            valign === Gtk.Align.END    ?
                (parentHeight - 
                pointerHeight) - margin :
            0
        return [x, y]
    }

    const fixed = <Gtk.Fixed class="workspace-cords-area" can_target={false} can_focus={false} hexpand={true} vexpand={true} />

    const focusedWp = state.currentWorkspaceBind((e) => findWorkspaceById(workspaces, e, monitor) )
    focusedWp()

    const pointer = <Adw.Bin 
        class="workspace-pointer" 
        height_request={3}
        width_request={10}
    />
    
    
    let destX, destY
    let departX = 0
    let departY = 0


    fixed.put(pointer, -50, 0)

    function setCords(){
        [destX, destY] = getFocusedWpCords(
            workspaces.get().indexOf(focusedWp.get()),
            fixed, 
            workspaces.get().length,
            pointer.get_width(),
            pointer.get_height(),
            Gtk.Align.END,
            0
        )
        departX = fixed.get_child_position(pointer)[0]
        departY = fixed.get_child_position(pointer)[1]
    }

    let anim

    const target = Adw.CallbackAnimationTarget.new(
        function(value) {
            fixed.move(
                pointer, 
                departX + (destX - departX) * anim.value,
                departY + (destY - departY) * anim.value
            )
        }
    )

    anim = new Adw.TimedAnimation({
        widget: pointer,
        duration: 250, 
        target: target
    })
    anim.valueFrom = 0.0
    anim.valueTo   = 1.0
    

    focusedWp.subscribe(()=>{
        setCords()
        anim.play()
    })

    return fixed
}
export default HyprWorkspacesPointer