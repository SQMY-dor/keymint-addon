/**
 * Oh My Keymint — i18n Engine (inline, no XHR)
 */
(function () {
  "use strict";

  var STRINGS = {
    "en": {"lang":"English","header":{"title":"🔑 Oh My Keymint Modded","checking":"• Checking...","ready":"• Ready"},"tabs":{"scope":"Scope","keybox":"Keybox","controls":"Controls","about":"About"},"scope":{"title":"📋 Package Scope","desc":"Manage the package name range intercepted by Keymint Injector (scoop list)","add_placeholder":"Enter package name, e.g. com.example.app","add_btn":"➕ Add","deny_placeholder":"Enter package name to deny","deny_btn":"⛔ Deny","scoop_count":"scoop: 0","deny_count":"deny: 0","mode":"Mode: Normal","search_placeholder":"🔍 Search packages...","refresh_btn":"🔄 Refresh","scoop_header":"Scoop List","deny_header":"Deny","loading":"Loading...","no_match":"No matching packages","apply_btn":"💾 Apply Changes","reset_btn":"🔄 Reset to All Apps","deny_badge":"DENY","unban_title":"Remove from deny","ban_title":"Add to deny list","remove_title":"Delete"},"keybox":{"title":"🔑 Keybox Management","desc":"Import or update keybox.xml file","current":"Current Keybox:","format":"Keybox Format:","backup":"Backup:","checking":"Checking...","exists":"✅ Exists","not_exists":"❌ Not found","backed_up":"✅ Backed up","no_backup":"❌ No backup","small":"⚠️ Small","url_section":"🌐 Download from URL","url_placeholder":"https://example.com/keybox.xml","download_btn":"⬇️ Download","paste_section":"📝 Paste Content","paste_placeholder":"Paste the full content of keybox.xml here...","import_btn":"📥 Import","file_section":"📁 File Upload (Browse Device)","file_placeholder":"Click to select keybox.xml file","confirm_btn":"📥 Confirm Deploy","downloading":"Downloading...","verifying":"Verifying...","deploying":"Deploying...","deploy_done":"✅ Deploy Complete","download_failed":"❌ Download Failed","reading_file":"Reading file...","processing":"Processing...","browser_title":"Browse Device Files","browser_search":"🔍 Filter .xml files","no_selection":"No file selected","select_btn":"Select","empty_dir":"Empty directory","no_image_dir":"No images in this directory","toast_imported":"✅ Keybox imported","toast_download_failed":"❌ Download failed","toast_invalid_url":"Please enter a Keybox URL","toast_paste":"Please paste keybox.xml content","toast_not_keybox":"⚠️ Content does not appear to be valid keybox.xml format","toast_read_failed":"❌ Failed to read file","toast_invalid_file":"⚠️ Invalid keybox format (file content is not valid keybox.xml)"},"controls":{"title":"⚙️ Service Control","desc":"Control Oh My Keymint daemons","keymint_daemon":"Keymint Daemon","injector_daemon":"Injector Daemon","unknown":"Unknown","running":"🟢 Running","stopped":"🔴 Stopped","refresh_status":"🔄 Refresh Status","restart_keymint":"🔄 Restart Keymint","restart_injector":"🔄 Restart Injector","restart_all":"🔄 Restart All","kill_gms":"🛑 Kill GMS","quick_actions":"⚡ Quick Actions","scope_only":"📋 Update Scope Only","full_deploy":"🚀 Full Deploy","log_section":"📜 Execution Log","clear_log":"Clear","log_ready":"Ready"},"about":{"title":"ℹ️ About","module_name":"Module Name","module_value":"Oh My Keymint Modded","version":"Version","author":"Author","authors":"James Clef, yourbestregard","webui":"WebUI","install_path":"Install Path","data_dir":"Data Directory","description":"Custom keystore implementation for bypassing Android Key Attestation.","github":"GitHub","telegram":"Telegram","bg_settings":"🖼️ Background","clear_bg":"Clear Background","no_bg":"No background set","bg_url_placeholder":"Enter image URL or path","apply_bg":"Apply","file_browse":"📁 Browse images from device","bg_set":"🖼️ Background set","bg_cleared":"Background cleared"},"modal":{"close":"✕"},"toast":{"pkg_added":"✅ Added {pkg}","pkg_removed":"✅ Removed {pkg}","pkg_exists":"⚠️ Package already exists","pkg_enter":"Please enter a package name","pkg_denied":"⛔ Denied {pkg}","pkg_undenied":"✅ Removed deny for {pkg}","config_updated":"✅ Configuration updated","pkg_count_added":"📋 Added {count} packages","keymint_restarting":"🔄 Keymint restarting","injector_restarting":"🔄 Injector restarting","all_restarting":"🔄 Restarting all","gms_killed":"🛑 GMS process terminated","full_deploy_done":"🚀 Full deploy complete"},"log":{"init":"WebUI initializing...","init_done":"WebUI initialization complete","synced":"injector.toml synced","sync_failed":"Sync write failed: {error}","read_failed":"Cannot read injector.toml, using defaults","read_count":"Read {scoop} scoop packages, {deny} deny packages","applying_scope":"Applying package scope changes...","collecting_apps":"Collecting all installed apps...","app_list_failed":"Failed to get app list","added_apps":"Added {count} apps to scoop list","downloading_keybox":"Downloading keybox from URL: {url}","keybox_deployed":"Keybox successfully deployed","keybox_download_failed":"Keybox download failed","importing_keybox":"Importing keybox from pasted content...","keybox_imported":"Keybox imported from pasted content","reading_keybox":"Reading keybox from {path}...","read_file_failed":"Failed to read selected file","invalid_keybox":"Selected file is not valid keybox.xml","restarting_keymint":"Restarting Keymint...","restarting_injector":"Restarting Injector...","restarting_all":"Restarting all daemons...","killing_gms":"Killing GMS processes...","gms_killed":"GMS processes killed","full_deploy_start":"===== Full Deploy Start =====","step1":"[1/4] Updating package scope...","step2":"[2/4] Restarting daemons...","step3":"[3/4] Killing GMS processes...","step4":"[4/4] Verifying status...","full_deploy_done":"===== Full Deploy Complete ====="}},
    "zh-CN": {"lang":"简体中文","header":{"title":"🔑 Oh My Keymint Modded","checking":"• 检查中...","ready":"• 就绪"},"tabs":{"scope":"包名管理","keybox":"Keybox","controls":"服务控制","about":"关于"},"scope":{"title":"📋 包名管理","desc":"管理 Keymint Injector 拦截的包名范围（scoop 列表）","add_placeholder":"输入包名，如 com.example.app","add_btn":"➕ 添加","deny_placeholder":"输入要拦截的包名 (deny 列表)","deny_btn":"⛔ 拦截","scoop_count":"scoop: 0","deny_count":"deny: 0","mode":"模式: 正常","search_placeholder":"🔍 搜索包名...","refresh_btn":"🔄 刷新","scoop_header":"Scoop 列表","deny_header":"Deny","loading":"加载中...","no_match":"没有匹配的包名","apply_btn":"💾 应用更改","reset_btn":"🔄 重置为所有应用","deny_badge":"DENY","unban_title":"取消拦截","ban_title":"加入拦截列表","remove_title":"删除"},"keybox":{"title":"🔑 Keybox 管理","desc":"导入或更新 keybox.xml 文件","current":"当前 Keybox:","format":"Keybox 格式:","backup":"备份:","checking":"检测中...","exists":"✅ 存在","not_exists":"❌ 不存在","backed_up":"✅ 已备份","no_backup":"❌ 无备份","small":"⚠️ 较小","url_section":"🌐 从 URL 下载","url_placeholder":"https://example.com/keybox.xml","download_btn":"⬇️ 下载","paste_section":"📝 粘贴内容","paste_placeholder":"在此粘贴 keybox.xml 的完整内容...","import_btn":"📥 导入","file_section":"📁 文件上传（浏览设备目录）","file_placeholder":"点击选择 keybox.xml 文件","confirm_btn":"📥 确认部署","downloading":"下载中...","verifying":"验证中...","deploying":"部署中...","deploy_done":"✅ 部署完成","download_failed":"❌ 下载失败","reading_file":"读取文件...","processing":"处理中...","browser_title":"浏览设备文件","browser_search":"🔍 筛选 .xml 文件","no_selection":"未选择文件","select_btn":"选择","empty_dir":"空目录","no_image_dir":"此目录没有图片文件","toast_imported":"✅ Keybox 已导入","toast_download_failed":"❌ 下载失败","toast_invalid_url":"请输入 Keybox URL","toast_paste":"请粘贴 keybox.xml 内容","toast_not_keybox":"⚠️ 内容似乎不是有效的 keybox.xml 格式","toast_read_failed":"❌ 读取文件失败","toast_invalid_file":"⚠️ 无效的 keybox 格式（文件内容不是有效的 keybox.xml）"},"controls":{"title":"⚙️ 服务控制","desc":"控制 Oh My Keymint 的守护进程","keymint_daemon":"Keymint Daemon","injector_daemon":"Injector Daemon","unknown":"未知","running":"🟢 运行中","stopped":"🔴 已停止","refresh_status":"🔄 刷新状态","restart_keymint":"🔄 重启 Keymint","restart_injector":"🔄 重启 Injector","restart_all":"🔄 重启全部","kill_gms":"🛑 杀死 GMS","quick_actions":"⚡ 快捷操作","scope_only":"📋 仅更新 Scope","full_deploy":"🚀 完整部署","log_section":"📜 执行日志","clear_log":"清除","log_ready":"就绪"},"about":{"title":"ℹ️ 关于","module_name":"模块名称","module_value":"Oh My Keymint Modded","version":"版本","author":"作者","authors":"James Clef, yourbestregard","webui":"WebUI","install_path":"安装路径","data_dir":"数据目录","description":"用于绕过 Android Key Attestation 的自定义 keystore 实现。本 WebUI 提供可视化包名管理、Keybox 导入和服务控制功能。","github":"GitHub","telegram":"Telegram","bg_settings":"🖼️ 背景图","clear_bg":"清除背景","no_bg":"未设置背景","bg_url_placeholder":"输入图片 URL 或路径","apply_bg":"应用","file_browse":"📁 从设备浏览图片","bg_set":"🖼️ 背景已设置","bg_cleared":"背景已清除"},"modal":{"close":"✕"},"toast":{"pkg_added":"✅ 已添加 {pkg}","pkg_removed":"已删除 {pkg}","pkg_exists":"⚠️ 包名已存在","pkg_enter":"请输入包名","pkg_denied":"⛔ 已拦截 {pkg}","pkg_undenied":"✅ 已取消拦截 {pkg}","config_updated":"✅ 配置已更新","pkg_count_added":"📋 已添加 {count} 个包名","keymint_restarting":"🔄 Keymint 重启中","injector_restarting":"🔄 Injector 重启中","all_restarting":"🔄 全部重启中","gms_killed":"🛑 GMS 进程已终止","full_deploy_done":"🚀 完整部署完成"},"log":{"init":"WebUI 初始化中...","init_done":"WebUI 初始化完成","synced":"injector.toml 已同步","sync_failed":"同步写入失败: {error}","read_failed":"无法读取 injector.toml，使用默认配置","read_count":"读取到 {scoop} 个 scoop 包名, {deny} 个 deny 包名","applying_scope":"正在应用包名范围更改...","collecting_apps":"正在收集所有已安装应用...","app_list_failed":"获取应用列表失败","added_apps":"已添加 {count} 个应用到 scoop 列表","downloading_keybox":"正在从 URL 下载 keybox: {url}","keybox_deployed":"Keybox 已成功部署","keybox_download_failed":"Keybox 下载失败","importing_keybox":"正在从粘贴内容导入 keybox...","keybox_imported":"Keybox 已从粘贴内容导入","reading_keybox":"正在从 {path} 读取 keybox...","read_file_failed":"无法读取所选文件","invalid_keybox":"所选文件不是有效的 keybox.xml","restarting_keymint":"正在重启 Keymint...","restarting_injector":"正在重启 Injector...","restarting_all":"正在重启所有守护进程...","killing_gms":"正在杀死 GMS 进程...","gms_killed":"GMS 进程已杀死","full_deploy_start":"===== 开始完整部署 =====","step1":"[1/4] 更新包名范围...","step2":"[2/4] 重启守护进程...","step3":"[3/4] 杀死 GMS 进程...","step4":"[4/4] 验证状态...","full_deploy_done":"===== 完整部署完成 ====="}}
  };

  function detectLang() {
    var m = location.search.match(/[?&]lang=([a-zA-Z-]+)/);
    if (m && STRINGS[m[1]]) return m[1];
    var sys = (navigator.language || "en").replace("_", "-");
    if (STRINGS[sys]) return sys;
    var pfx = sys.split("-")[0];
    for (var k in STRINGS) { if (k.startsWith(pfx)) return k; }
    return "en";
  }

  var lang = detectLang();
  var strings = STRINGS[lang] || STRINGS["en"];

  function get(keys, src) {
    var parts = keys.split("."), v = src;
    for (var i = 0; i < parts.length; i++) { if (v == null) return undefined; v = v[parts[i]]; }
    return v;
  }

  function tpl(str, vars) {
    if (!vars) return str;
    return str.replace(/\{(\w+)\}/g, function (_, k) { return vars[k] !== undefined ? vars[k] : "{" + k + "}"; });
  }

  window.__ = function (key, vars) {
    var s = get(key, strings);
    return typeof s === "string" ? tpl(s, vars) : key;
  };
  window.__lang = lang;

  function scanDOM() {
    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i], key = el.getAttribute("data-i18n");
      if (!key) continue;
      var text = get(key, strings);
      if (typeof text === "string") {
        var phKey = el.getAttribute("data-i18n-placeholder");
        if (phKey) { var ph = get(phKey, strings); if (typeof ph === "string") el.setAttribute("placeholder", ph); }
        if (el.children.length === 0) el.textContent = text;
      }
    }
  }

  document.addEventListener("DOMContentLoaded", scanDOM);
})();
