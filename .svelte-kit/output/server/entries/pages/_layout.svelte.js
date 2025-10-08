import { c as create_ssr_component, a as subscribe, e as each, b as escape } from "../../chunks/ssr.js";
import { p as page } from "../../chunks/stores.js";
const app = "";
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: 'html{scroll-behavior:smooth}.reduce-motion *{animation-duration:0.01ms !important;animation-iteration-count:1 !important;transition-duration:0.01ms !important}[data-theme="dark"]{color-scheme:dark}',
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "🏠"
    },
    {
      name: "Registro",
      path: "/registro",
      icon: "📝"
    },
    {
      name: "Exercícios",
      path: "/exercicios",
      icon: "💪"
    },
    {
      name: "Hidratação",
      path: "/hidratacao",
      icon: "💧"
    },
    {
      name: "Histórico",
      path: "/historico",
      icon: "📊"
    },
    {
      name: "Insights",
      path: "/insights",
      icon: "🧠"
    },
    {
      name: "Conquistas",
      path: "/conquistas",
      icon: "🏆"
    },
    {
      name: "Perfil",
      path: "/perfil",
      icon: "👤"
    },
    {
      name: "Configurações",
      path: "/configuracao",
      icon: "⚙️"
    },
    {
      name: "Relatórios",
      path: "/relatorios",
      icon: "📈"
    },
    { name: "Ajuda", path: "/ajuda", icon: "❓" }
  ];
  $$result.css.add(css);
  $$unsubscribe_page();
  return `${$$result.head += `<!-- HEAD_svelte-lracyj_START -->${$$result.title = `<title>MacroFit - Coach Nutricional IA</title>`, ""}<!-- HEAD_svelte-lracyj_END -->`, ""}  <nav class="bg-white shadow-lg border-b border-gray-200"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex justify-between h-16"> <div class="flex items-center"><button class="flex items-center space-x-2" data-svelte-h="svelte-1bjffmi"><div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center"><span class="text-white font-bold text-sm">M</span></div> <span class="text-xl font-bold text-gray-800">MacroFit</span></button></div>  <div class="hidden md:flex items-center space-x-4">${each(menuItems, (item) => {
    return `<button class="${"px-3 py-2 rounded-md text-sm font-medium transition-colors " + escape(
      $page.url.pathname === item.path ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
      true
    )}"><span class="mr-1">${escape(item.icon)}</span> ${escape(item.name)} </button>`;
  })}</div>  <div class="md:hidden flex items-center"><button class="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition-colors"><svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">${`<path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>`}</svg></button></div></div></div>  ${``}</nav>  <main class="min-h-screen bg-gray-50">${slots.default ? slots.default({}) : ``}</main> `;
});
export {
  Layout as default
};
