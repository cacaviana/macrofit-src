

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/configuracao/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.49351147.js","_app/immutable/chunks/scheduler.322242fb.js","_app/immutable/chunks/index.d5f86c59.js","_app/immutable/chunks/each.e59479a4.js","_app/immutable/chunks/navigation.896eb98e.js","_app/immutable/chunks/singletons.37dba535.js","_app/immutable/chunks/environment.d04864f2.js","_app/immutable/chunks/Input.70b19d3a.js","_app/immutable/chunks/authGuard.f24bd116.js","_app/immutable/chunks/requests.c4dce191.js","_app/immutable/chunks/user.service.c25b1e91.js","_app/immutable/chunks/users.e2f3b943.js"];
export const stylesheets = [];
export const fonts = [];
