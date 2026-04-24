/* 
Status bar for hyprland
Copyright (C) 2026  androeat (dimamazepa9@gmail.com)
*/

import app from "ags/gtk4/app"
import css from "./data/style.css"
import config from "./src/config.jsx"
import { programArgs } from "system"
import { For, createBinding } from "ags"
import BarInstance from "./src/BarInstance.jsx"
import GLib from 'gi://GLib'
import { getSelectedMonitors } from "./src/utils.jsx";



function printHelp() {
    console.log(
"                           \n\
Status bar by androeat      \n\
Usage:                      \n\
    abs-bar [args]          \n\
                            \n\
Available arguments:        \n\
                            \n\
                            \n\
"
    )
    return undefined
}
function parseArgs(argv) {
    for (let i = 0; i <= argv.length; i++) {
        const e = argv[i];
        switch (e) {
            case "--help":
                printHelp()
                app.quit()
                break;
        
            default:
                break;
        }
    }

}

function fixAssets() { // convert config.ASSETS to absolute path
    config.ASSETS = GLib.canonicalize_filename(
        config.ASSETS.replace('~', GLib.get_home_dir())
    , GLib.get_current_dir()) 
}

app.start({
    css: css,
    instanceName: "bar",
    requestHandler(argv, response) {
        const [cmd, arg, ...rest] = argv
        if (cmd == "change-worksace-to") {
            state.currentWorkspace = Number(arg)
            return 
        }
        response("unknown command")
    },
    main() {
        parseArgs(programArgs)
        fixAssets()
        
        app.add_icons( GLib.build_filenamev([config.ASSETS, "icons"]) )


        return (
            <For each={ config.IS_ON_EACH_MONITOR ? createBinding(app, "monitors") : getSelectedMonitors()}>
                {(monitor) => (
                    <BarInstance gdkmonitor={monitor} />
                )}
            </For>
        )
    }
})
