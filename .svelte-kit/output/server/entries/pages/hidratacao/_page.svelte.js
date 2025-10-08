import { c as create_ssr_component, a as subscribe, b as escape } from "../../../chunks/ssr.js";
import { u as useAuthGuard } from "../../../chunks/authGuard.js";
import { U as UserService } from "../../../chunks/user.service.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $isChecking, $$unsubscribe_isChecking;
  let $isAuthenticated, $$unsubscribe_isAuthenticated;
  const { isAuthenticated, isChecking } = useAuthGuard();
  $$unsubscribe_isAuthenticated = subscribe(isAuthenticated, (value) => $isAuthenticated = value);
  $$unsubscribe_isChecking = subscribe(isChecking, (value) => $isChecking = value);
  new UserService();
  $$unsubscribe_isChecking();
  $$unsubscribe_isAuthenticated();
  return `${$$result.head += `<!-- HEAD_svelte-18t3s75_START -->${$$result.title = `<title>Hidratação - MacroFit</title>`, ""}<!-- HEAD_svelte-18t3s75_END -->`, ""}  ${$isChecking ? `<div class="min-h-screen flex items-center justify-center" data-svelte-h="svelte-jouxqq"><div class="text-center"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div> <p class="text-gray-600">Verificando autenticação...</p></div></div>` : `${!$isAuthenticated ? `<div></div>` : ` <div class="min-h-screen bg-gray-50"> <header class="bg-white shadow-sm border-b"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex items-center justify-between h-16"><div class="flex items-center space-x-4"><button class="text-gray-400 hover:text-gray-600" data-svelte-h="svelte-ghdzdg"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg></button> <h1 class="text-xl font-semibold text-gray-900" data-svelte-h="svelte-8reqtx">Hidratação</h1></div> <div class="text-right"><p class="text-sm font-medium text-gray-900" data-svelte-h="svelte-15lys47">Hoje</p> <p class="text-xs text-gray-500">${escape((/* @__PURE__ */ new Date()).toLocaleDateString("pt-BR"))}</p></div></div></div></header>  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">${` <div class="text-center py-12" data-svelte-h="svelte-m41ic1"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div> <p class="text-gray-600">Carregando dados de hidratação...</p></div>`}</main></div>`}`}`;
});
export {
  Page as default
};
