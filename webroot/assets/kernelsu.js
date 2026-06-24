/* KernelSU / WebUI built-in APIs - stub for local dev */
const _hermes_kernelsu = typeof ksu !== 'undefined' ? ksu : {
  exec(cmd, opts) { return Promise.resolve({ errno: 0, stdout: '', stderr: '' }); },
  toast(msg) { console.log('[toast]', msg); },
};

export const exec = _hermes_kernelsu.exec.bind(_hermes_kernelsu);
export const spawn = _hermes_kernelsu.spawn ? _hermes_kernelsu.spawn.bind(_hermes_kernelsu) : null;
export const toast = _hermes_kernelsu.toast.bind(_hermes_kernelsu);
export const enableEdgeToEdge = _hermes_kernelsu.enableEdgeToEdge ? _hermes_kernelsu.enableEdgeToEdge.bind(_hermes_kernelsu) : async () => {};
