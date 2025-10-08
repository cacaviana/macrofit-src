

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.ebd788ca.js","_app/immutable/chunks/scheduler.322242fb.js","_app/immutable/chunks/index.d5f86c59.js","_app/immutable/chunks/each.e59479a4.js","_app/immutable/chunks/stores.62bcfad0.js","_app/immutable/chunks/singletons.37dba535.js","_app/immutable/chunks/navigation.896eb98e.js"];
export const stylesheets = ["_app/immutable/assets/0.4dfa6057.css"];
export const fonts = [];
