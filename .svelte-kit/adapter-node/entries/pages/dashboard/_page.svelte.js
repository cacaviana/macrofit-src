import { c as create_ssr_component, a as subscribe, b as escape } from "../../../chunks/ssr.js";
import { u as useAuthGuard } from "../../../chunks/authGuard.js";
import { M as MealsService } from "../../../chunks/meals.service.js";
import { U as UserService } from "../../../chunks/user.service.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $isChecking, $$unsubscribe_isChecking;
  let $isAuthenticated, $$unsubscribe_isAuthenticated;
  const { isAuthenticated, isChecking } = useAuthGuard();
  $$unsubscribe_isAuthenticated = subscribe(isAuthenticated, (value) => $isAuthenticated = value);
  $$unsubscribe_isChecking = subscribe(isChecking, (value) => $isChecking = value);
  new MealsService();
  new UserService();
  $$unsubscribe_isChecking();
  $$unsubscribe_isAuthenticated();
  return `${$$result.head += `<!-- HEAD_svelte-1vv8srb_START -->${$$result.title = `<title>Dashboard - MacroFit</title>`, ""}<!-- HEAD_svelte-1vv8srb_END -->`, ""}  ${$isChecking ? `<div class="min-h-screen flex items-center justify-center" data-svelte-h="svelte-jouxqq"><div class="text-center"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div> <p class="text-gray-600">Verificando autenticação...</p></div></div>` : `${!$isAuthenticated ? ` <div></div>` : ` <div class="min-h-screen bg-gray-50"> <header class="bg-white shadow-sm border-b"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex justify-between items-center h-16"> <div class="flex items-center" data-svelte-h="svelte-fhqmvr"><div class="flex items-center"><svg class="w-8 h-8 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path></svg> <h1 class="text-xl font-bold text-gray-900">MacroFit</h1></div> <span class="ml-2 text-sm text-gray-500">AI Nutricional</span></div>  <div class="flex items-center space-x-4"><div class="text-right"><p class="text-sm font-medium text-gray-900" data-svelte-h="svelte-15lys47">Hoje</p> <p class="text-xs text-gray-500">${escape((/* @__PURE__ */ new Date()).toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long"
  }))}</p></div>  <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center" data-svelte-h="svelte-w0tly7"><span class="text-white text-sm font-medium">M</span></div></div></div></div></header>  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">${` <div class="text-center py-12" data-svelte-h="svelte-aoq982"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div> <p class="text-gray-600">Carregando seus dados...</p></div>`}</main></div>`}`}`;
});
export {
  Page as default
};
