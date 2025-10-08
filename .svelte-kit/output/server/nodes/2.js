

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.eb6de49f.js","_app/immutable/chunks/scheduler.322242fb.js","_app/immutable/chunks/index.d5f86c59.js","_app/immutable/chunks/navigation.896eb98e.js","_app/immutable/chunks/singletons.37dba535.js"];
export const stylesheets = [];
export const fonts = [];
