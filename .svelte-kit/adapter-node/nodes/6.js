

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/dashboard/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/6.7b591e43.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/scheduler.322242fb.js","_app/immutable/chunks/index.d5f86c59.js","_app/immutable/chunks/navigation.896eb98e.js","_app/immutable/chunks/singletons.37dba535.js","_app/immutable/chunks/Badge.be8b82f4.js","_app/immutable/chunks/environment.d04864f2.js","_app/immutable/chunks/ProgressCircle.8638a7c1.js","_app/immutable/chunks/authGuard.f24bd116.js","_app/immutable/chunks/meals.service.4f5c8e6a.js","_app/immutable/chunks/user.service.c25b1e91.js","_app/immutable/chunks/users.e2f3b943.js"];
export const stylesheets = [];
export const fonts = [];
