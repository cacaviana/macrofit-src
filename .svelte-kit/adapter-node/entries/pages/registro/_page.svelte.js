import { c as create_ssr_component, a as subscribe, v as validate_component, e as each, b as escape } from "../../../chunks/ssr.js";
import { B as Button } from "../../../chunks/Button.js";
import { C as Card } from "../../../chunks/Card.js";
import { I as Input } from "../../../chunks/Input.js";
import { M as Modal } from "../../../chunks/Modal.js";
import { u as useAuthGuard } from "../../../chunks/authGuard.js";
import { M as MealsService } from "../../../chunks/meals.service.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $isChecking, $$unsubscribe_isChecking;
  let $isAuthenticated, $$unsubscribe_isAuthenticated;
  let isLoading = false;
  let textDescription = "";
  let selectedMealType = "breakfast";
  let searchQuery = "";
  let searchResults = [];
  let isSearching = false;
  let showSearchModal = false;
  const { isAuthenticated, isChecking } = useAuthGuard();
  $$unsubscribe_isAuthenticated = subscribe(isAuthenticated, (value) => $isAuthenticated = value);
  $$unsubscribe_isChecking = subscribe(isChecking, (value) => $isChecking = value);
  new MealsService();
  const mealTypes = [
    {
      value: "breakfast",
      label: "Café da manhã",
      icon: "☀️"
    },
    {
      value: "lunch",
      label: "Almoço",
      icon: "🍽️"
    },
    {
      value: "dinner",
      label: "Jantar",
      icon: "🌙"
    },
    {
      value: "snack",
      label: "Lanche",
      icon: "🍎"
    }
  ];
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-1qixdru_START -->${$$result.title = `<title>Registrar Refeição - MacroFit</title>`, ""}<!-- HEAD_svelte-1qixdru_END -->`, ""}  ${$isChecking ? `<div class="min-h-screen flex items-center justify-center" data-svelte-h="svelte-jouxqq"><div class="text-center"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div> <p class="text-gray-600">Verificando autenticação...</p></div></div>` : `${!$isAuthenticated ? `<div></div>` : ` <div class="min-h-screen bg-gray-50"> <header class="bg-white shadow-sm border-b"><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex items-center justify-between h-16"><div class="flex items-center space-x-4"><button class="text-gray-400 hover:text-gray-600" data-svelte-h="svelte-ghdzdg"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg></button> <h1 class="text-xl font-semibold text-gray-900" data-svelte-h="svelte-j9sxio">Registrar Refeição</h1></div> <p class="text-sm text-gray-500" data-svelte-h="svelte-1qqi5ts">Capturar via texto, voz, foto ou código</p></div></div></header>  <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"> ${``} ${``}  ${validate_component(Card, "Card").$$render($$result, { class: "mb-8" }, {}, {
      default: () => {
        return `<h2 class="text-lg font-semibold text-gray-900 mb-4" data-svelte-h="svelte-1iyx3st">Tipo de Refeição</h2> <div class="grid grid-cols-2 md:grid-cols-4 gap-3">${each(mealTypes, (mealType) => {
          return `<button class="${"p-3 rounded-lg border-2 transition-colors " + escape(
            selectedMealType === mealType.value ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300",
            true
          )}"><div class="text-2xl mb-1">${escape(mealType.icon)}</div> <div class="text-sm font-medium text-gray-900">${escape(mealType.label)}</div> </button>`;
        })}</div>`;
      }
    })}  ${validate_component(Card, "Card").$$render($$result, {}, {}, {
      default: () => {
        return ` <div class="border-b border-gray-200 mb-6"><nav class="-mb-px flex space-x-8"><button class="${"py-2 px-1 border-b-2 font-medium text-sm " + escape(
          "border-blue-500 text-blue-600",
          true
        )}">📝 Texto</button> <button class="${"py-2 px-1 border-b-2 font-medium text-sm " + escape(
          "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
          true
        )}">📷 Foto</button> <button class="${"py-2 px-1 border-b-2 font-medium text-sm " + escape(
          "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
          true
        )}">🎤 Voz</button> <button class="${"py-2 px-1 border-b-2 font-medium text-sm " + escape(
          "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
          true
        )}">📊 Código de Barras</button></nav></div>  ${` <div class="space-y-6"><div><label class="block text-sm font-medium text-gray-700 mb-2" data-svelte-h="svelte-1d53drm">Descreva sua refeição</label> <textarea placeholder="Ex: 2 ovos mexidos, 1 fatia de pão integral, 1 xícara de café com leite" rows="4" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" ${""}>${escape("")}</textarea> <p class="mt-1 text-xs text-gray-500" data-svelte-h="svelte-qwg5fy">Seja específico sobre quantidades e ingredientes para uma análise mais precisa</p></div> <div class="flex justify-between items-center">${validate_component(Button, "Button").$$render($$result, { variant: "outline", disabled: isLoading }, {}, {
          default: () => {
            return `🔍 Buscar Alimentos`;
          }
        })} ${validate_component(Button, "Button").$$render(
          $$result,
          {
            variant: "primary",
            loading: isLoading,
            disabled: !textDescription.trim() || isLoading
          },
          {},
          {
            default: () => {
              return `Analisar com IA`;
            }
          }
        )}</div></div>`}`;
      }
    })}  ${validate_component(Card, "Card").$$render(
      $$result,
      {
        class: "bg-gradient-to-r from-blue-50 to-purple-50"
      },
      {},
      {
        default: () => {
          return `<div class="flex items-start space-x-4" data-svelte-h="svelte-m4tfyy"><div class="flex-shrink-0"><div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center"><svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg></div></div> <div class="flex-1"><h3 class="text-lg font-semibold text-gray-900 mb-2">Sugestões Inteligentes da IA</h3> <p class="text-gray-600 mb-4">Com base nas suas metas e preferências, a IA pode sugerir correspondências precisas para os alimentos que você registrar.</p> <div class="grid md:grid-cols-3 gap-4"><div class="bg-white rounded-lg p-3 border"><div class="flex items-center mb-2"><div class="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div> <span class="text-sm font-medium">Reconhecimento Inteligente</span></div> <p class="text-xs text-gray-600">Identifica alimentos em fotos e voz</p></div> <div class="bg-white rounded-lg p-3 border"><div class="flex items-center mb-2"><div class="w-2 h-2 bg-blue-500 rounded-full mr-2"></div> <span class="text-sm font-medium">Ajuste de Macros</span></div> <p class="text-xs text-gray-600">Sugestões baseadas nas suas metas</p></div> <div class="bg-white rounded-lg p-3 border"><div class="flex items-center mb-2"><div class="w-2 h-2 bg-green-500 rounded-full mr-2"></div> <span class="text-sm font-medium">Aprendizado Contínuo</span></div> <p class="text-xs text-gray-600">Melhora com seus hábitos</p></div></div></div></div>`;
        }
      }
    )}</main></div>  ${validate_component(Modal, "Modal").$$render(
      $$result,
      {
        title: "Buscar Alimentos",
        size: "lg",
        open: showSearchModal
      },
      {
        open: ($$value) => {
          showSearchModal = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<div class="space-y-4"> <div class="flex space-x-2">${validate_component(Input, "Input").$$render(
            $$result,
            {
              placeholder: "Digite para buscar alimentos...",
              class: "flex-1",
              value: searchQuery
            },
            {
              value: ($$value) => {
                searchQuery = $$value;
                $$settled = false;
              }
            },
            {}
          )} ${validate_component(Button, "Button").$$render($$result, { loading: isSearching }, {}, {
            default: () => {
              return `Buscar`;
            }
          })}</div>  ${searchResults.length > 0 ? `<div class="space-y-2 max-h-64 overflow-y-auto">${each(searchResults, (food) => {
            return `<div class="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"><div><p class="font-medium">${escape(food.name)}</p> <p class="text-sm text-gray-600">${escape(food.calories)} kcal por ${escape(food.unit)}</p></div> ${validate_component(Button, "Button").$$render($$result, { size: "sm", variant: "outline" }, {}, {
              default: () => {
                return `Adicionar
              `;
              }
            })} </div>`;
          })}</div>` : `${searchQuery && !isSearching ? `<p class="text-center text-gray-500 py-8" data-svelte-h="svelte-18ajtme">Nenhum alimento encontrado</p>` : ``}`}</div>`;
        }
      }
    )}`}`}`;
  } while (!$$settled);
  $$unsubscribe_isChecking();
  $$unsubscribe_isAuthenticated();
  return $$rendered;
});
export {
  Page as default
};
