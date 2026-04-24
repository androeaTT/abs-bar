/* 
Status bar for hyprland
Copyright (C) 2026  androeat (dimamazepa9@gmail.com)
*/
function TrayItem({item}) {
    return (
    <box visible={item.title !== null}>
        <menubutton 
            $={(self) => self.insert_action_group("dbusmenu", item.actionGroup)} 
            menuModel={item.menuModel}
            class="flat circular"
        >
            <image gicon={item.gicon} />
        </menubutton>
    </box>
    )
}
export default TrayItem