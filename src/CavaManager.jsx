/* 
Status bar for hyprland
Copyright (C) 2026  androeat (dimamazepa9@gmail.com)
*/
import { createState, createBinding } from "ags"
import { property, register, getter } from "ags/gobject"
import Card from "./widgets/Card.jsx"
import { state } from "./GlobalStateManager.jsx"
import { createPoll } from "ags/time"
import config from "./config.jsx"

import GObject  from "gi://GObject?version=2.0"
import Cava     from "gi://AstalCava"
import Adw      from "gi://Adw?version=1"
import Gtk      from "gi://Gtk?version=4.0"
import GLib     from 'gi://GLib'

import { average } from "./utils.jsx"

@register()
class CavaManager extends GObject.Object {
    @property(Array)    values      = []
    @property(Boolean)  isSilence   = true
    #cava = Cava.get_default()

    #getBarHeigth(index, values) {
        let valuesCopy = []
        const half = Math.floor(this.#cava.bars / 2);
        if (this.#cava.stereo) {
            const leftChannel  = values.slice(0,    half     ).reverse()
            const rightChannel = values.slice(half, this.#cava.bars)
            
            valuesCopy = [...leftChannel, ...rightChannel]
        } else {
            valuesCopy = [...values]
        }
        let value = valuesCopy[index]
        if (value > 0.00001) { 
            this.isSilence = false
        }

        value = value * config.CAVA_MAX_HEIGHT
        return value
    }

    get Widget() {
        const box = <box halign={Gtk.Align.CENTER} orientation={Gtk.Orientation.HORIZONTAL} spacing={3} />
        const revealer = (
            <revealer 
                transitionType={Gtk.RevealerTransitionType.SWING_LEFT} 
                halign={Gtk.Align.CENTER} 
                hexpand={true}
                revealChild={createBinding(this, "isSilence")((e) => !e)}
            >   
                <Card classes={createBinding(this, "isSilence")((e) => e ? "card" : "card card-con-right")}>
                    <box 
                        margin-start={4} 
                        width_request={102} 
                        orientation={Gtk.Orientation.VERTICAL} 
                        halign={Gtk.Align.CENTER} 
                    >
                        {box}
                    </box>
                </Card>
            </revealer>
        )

        for (let index = 0; index < this.#cava.bars; index++) {
            const barHeigth = createBinding(this, "values")((e) => e[index])
            barHeigth()
            box.append(
                <Adw.Clamp orientation={Gtk.Orientation.VERTICAL} maximum-size={config.CAVA_MAX_HEIGHT}>
                    <box halign={Gtk.Align.CENTER} valign={Gtk.Align.CENTER} orientation={Gtk.Orientation.HORIZONTAL} vexpand={true}>
                        <Adw.Bin 
                            valign={Gtk.Align.CENTER} 
                            width_request={config.CAVA_WIDTH} 
                            class="cava-piece" 
                            height_request={ barHeigth } 
                        />
                    </box>
                </Adw.Clamp>
            )
        }

        return revealer
    }
    constructor(){
        super()

        

        this.#cava.framerate = 100
        this.#cava.bars = 14
        this.#cava.autosens = true
        this.#cava.stereo = true

        for (let index = 0; index < this.#cava.bars; index++) {
            this.values[index] = 0
        }

        GLib.timeout_add(GLib.PRIORITY_DEFAULT, 3000, () => {
            const avg = average(this.#cava.values)        
            if (avg < 0.00001) {
                this.isSilence = true
            }
            
            return GLib.SOURCE_CONTINUE
        })


        const caval = createBinding( this.#cava, "values" )
        caval()
        caval.subscribe(() => {
            for (let index = 0; index < this.#cava.bars; index++) {
                this.values[index] = this.#getBarHeigth(index, caval.get())
                this.notify("values")
            }
        })
    }
}
const cavaManager = new CavaManager()
export default cavaManager