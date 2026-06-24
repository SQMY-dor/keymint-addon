#!/system/bin/sh
# Oh My Keymint Modded — WebUI Module (stealth install)

MODDIR=/data/adb/modules/oh_my_keymint

ui_print "- Oh My Keymint Modded WebUI Add-on"
ui_print "- 安装 WebUI 文件到: $MODDIR/webroot/"
ui_print "- 部署弱隐藏 BL 脚本: $MODDIR/webui/props_service.sh"

if [ ! -d "$MODDIR" ]; then
  ui_print "! 未检测到 Oh My Keymint Modded 模块"
  ui_print "! 请先安装主模块"
  abort
fi

if [ -f "$MODDIR/webroot/index.html" ]; then
  ui_print "- WebUI 已存在，正在覆盖更新..."
fi

mkdir -p "$MODDIR/webroot/assets"
mkdir -p "$MODDIR/webroot/i18n"
cp -rf "$MODPATH/webroot/"* "$MODDIR/webroot/"
chmod 644 "$MODDIR/webroot/"*.html "$MODDIR/webroot/"*.css "$MODDIR/webroot/"*.js 2>/dev/null
chmod 644 "$MODDIR/webroot/assets/"* 2>/dev/null
chmod 644 "$MODDIR/webroot/i18n/"* 2>/dev/null

mkdir -p "$MODDIR/webui"
cat > "$MODDIR/webui/props_service.sh" << 'PROPS_EOF'
#!/system/bin/sh

check_reset_prop() {
  local NAME=$1
  local EXPECTED=$2
  local VALUE=$(resetprop $NAME)
  [ -z $VALUE ] || [ $VALUE = $EXPECTED ] || resetprop -n $NAME $EXPECTED
}

contains_reset_prop() {
  local NAME=$1
  local CONTAINS=$2
  local NEWVAL=$3
  [[ "$(resetprop $NAME)" = *"$CONTAINS"* ]] && resetprop -n $NAME $NEWVAL
}

resetprop -w sys.boot_completed 0

check_reset_prop "ro.boot.vbmeta.device_state" "locked"
check_reset_prop "ro.boot.verifiedbootstate" "green"
check_reset_prop "ro.boot.flash.locked" "1"
check_reset_prop "ro.boot.veritymode" "enforcing"
check_reset_prop "ro.boot.warranty_bit" "0"
check_reset_prop "ro.warranty_bit" "0"
check_reset_prop "ro.debuggable" "0"
check_reset_prop "ro.force.debuggable" "0"
check_reset_prop "ro.secure" "1"
check_reset_prop "ro.adb.secure" "1"
check_reset_prop "ro.build.type" "user"
check_reset_prop "ro.build.tags" "release-keys"
check_reset_prop "ro.vendor.boot.warranty_bit" "0"
check_reset_prop "ro.vendor.warranty_bit" "0"
check_reset_prop "vendor.boot.vbmeta.device_state" "locked"
check_reset_prop "vendor.boot.verifiedbootstate" "green"
check_reset_prop "sys.oem_unlock_allowed" "0"

check_reset_prop "ro.secureboot.lockstate" "locked"

check_reset_prop "ro.boot.realmebootstate" "green"
check_reset_prop "ro.boot.realme.lockstate" "1"

contains_reset_prop "ro.bootmode" "recovery" "unknown"
contains_reset_prop "ro.boot.bootmode" "recovery" "unknown"
contains_reset_prop "vendor.boot.bootmode" "recovery" "unknown"
PROPS_EOF
chmod 755 "$MODDIR/webui/props_service.sh"
chmod 755 "$MODDIR/webui"
ui_print "- 弱隐藏 BL 脚本已部署"

if [ -f "$MODDIR/service.sh" ]; then
  if ! grep -q "props_service.sh" "$MODDIR/service.sh" 2>/dev/null; then
    echo "" >> "$MODDIR/service.sh"
    echo "# 弱隐藏 BL - by WebUI Addon" >> "$MODDIR/service.sh"
    echo "source $MODDIR/webui/props_service.sh" >> "$MODDIR/service.sh"
    ui_print "- 已集成到主模块 service.sh（开机自启）"
  else
    ui_print "- props_service.sh 已在 service.sh 中，跳过"
  fi
else
  ui_print "! 未找到主模块 service.sh，请手动添加:"
  ui_print "  source $MODDIR/webui/props_service.sh"
fi

if [ ! -f "$MODDIR/action.sh" ] || [ "$(head -1 "$MODDIR/action.sh")" = "# Launch WebUI in KSUWebUIStandalone or MMRL or WebUI X with action.sh" ]; then
  cp "$MODDIR/action.sh" "$MODDIR/action.sh.bak" 2>/dev/null
  cp "$MODPATH/action.sh" "$MODDIR/action.sh" 2>/dev/null
  chmod 755 "$MODDIR/action.sh"
  ui_print "- action.sh 已更新（含 WebUI 启动）"
fi

ui_print ""
ui_print "✅ WebUI 安装完成！"
ui_print "在 KernelSU Manager 中点 Action 按钮启动"
ui_print "或打开 KSUWebUIStandalone / MMRL 查看"

rm -f "$MODPATH/module.prop"
rm -f "$MODPATH/disable" 2>/dev/null
ui_print "- 已隐藏，不会在模块列表中显示"
