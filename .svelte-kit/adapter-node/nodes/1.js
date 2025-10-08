

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.aa83b9c1.js","_app/immutable/chunks/scheduler.322242fb.js","_app/immutable/chunks/index.d5f86c59.js","_app/immutable/chunks/stores.62bcfad0.js","_app/immutable/chunks/singletons.37dba535.js"];
export const stylesheets = [];
export const fonts = [];
