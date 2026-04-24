/* 
Status bar for hyprland
Copyright (C) 2026  androeat (dimamazepa9@gmail.com)
*/
import { Astal } from "ags/gtk4"

const config = {
    NAMESPACE:                      "statusbar",
    VANCHOR:                        Astal.WindowAnchor.BOTTOM,          
    LAYER:                          Astal.Layer.BOTTOM,       
    EXCLUSIVITY:                    Astal.Exclusivity.NORMAL, 
    IS_ON_EACH_MONITOR:             true, 
    MONITORS:                       [0],
    ASSETS:                         "~/.local/share/abs-bar/data",
    CAVA_WIDTH:                     3,
    CAVA_MAX_HEIGHT:                32,     
    WORKSPACES_RANGE_PER_MONITOR:   {
        "HDMI-A-3": [1,9],
        "DP-3":     [10, 10]
    },
    IS_WORKSPACES_DYNAMIC:          false,
    WORKSPACE_ON_CHANGING_LAYER:    Astal.Layer.TOP
}
export default config