# Oh My Keymint Modded — WebUI Action Button

MODID="oh_my_keymint"
MODDIR="/data/adb/modules/${MODID}"

echo "$(date +'%Y-%m-%d %H:%M:%S') [ACTION] Starting Oh My Keymint Modded WebUI..."

echo "$(date +'%Y-%m-%d %H:%M:%S') [ACTION] Running scope update..."
su -c "sh ${MODDIR}/mod/set_scope.sh 2>&1"
echo "$(date +'%Y-%m-%d %H:%M:%S') [ACTION] Installing keybox..."
su -c "sh ${MODDIR}/mod/install_keybox.sh 2>&1"
echo "$(date +'%Y-%m-%d %H:%M:%S') [ACTION] Restarting services..."
su -c "sh ${MODDIR}/mod/restart_omk.sh 2>&1"
su -c "sh ${MODDIR}/mod/kill_gms_process.sh 2>&1"

if pm path io.github.a13e300.ksuwebui >/dev/null 2>&1; then
    echo "$(date +'%Y-%m-%d %H:%M:%S') [ACTION] Launching WebUI in KSUWebUIStandalone..."
    am start -n "io.github.a13e300.ksuwebui/.WebUIActivity" -e id "${MODID}"
elif pm path com.dergoogler.mmrl >/dev/null 2>&1; then
    echo "$(date +'%Y-%m-%d %H:%M:%S') [ACTION] Launching WebUI in MMRL..."
    am start -n "com.dergoogler.mmrl/.ui.activity.webui.WebUIActivity" -e MOD_ID "${MODID}"
elif pm path com.dergoogler.mmrl.webuix > /dev/null 2>&1; then
    echo "$(date +'%Y-%m-%d %H:%M:%S') [ACTION] Launching WebUI in WebUI X..."
    am start -n "com.dergoogler.mmrl.webuix/.ui.activity.webui.WebUIActivity" -e MOD_ID "${MODID}"
else
    echo "$(date +'%Y-%m-%d %H:%M:%S') [ACTION] No WebUI app found. Opening in browser fallback..."
    am start -a android.intent.action.VIEW -d "file://${MODDIR}/webroot/index.html" 2>/dev/null || {
        echo "$(date +'%Y-%m-%d %H:%M:%S') [ACTION] ! No WebUI app or browser available"
        echo "$(date +'%Y-%m-%d %H:%M:%S') [ACTION] Please install KSUWebUIStandalone or MMRL"
        exit 0
    }
fi

echo "$(date +'%Y-%m-%d %H:%M:%S') [ACTION] WebUI launched successfully."
echo "$(date +'%Y-%m-%d %H:%M:%S') [ACTION] (⁠*⁠＾⁠3⁠＾⁠)⁠/⁠～⁠♡ Happy Meets Strong Integrity!"
sleep 5
su -c "sh ${MODDIR}/mod/redirect.sh 2>&1"
