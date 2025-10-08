import { c as create_ssr_component, d as add_attribute, a as subscribe, v as validate_component, b as escape, e as each } from "../../../chunks/ssr.js";
import { B as Button } from "../../../chunks/Button.js";
import { C as Card } from "../../../chunks/Card.js";
import { I as Input } from "../../../chunks/Input.js";
import { u as useAuthGuard } from "../../../chunks/authGuard.js";
import { M as MealsService } from "../../../chunks/meals.service.js";
const baseClasses = "inline-flex items-center font-medium rounded-full";
const Badge = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classes;
  let { variant = "default" } = $$props;
  let { size = "md" } = $$props;
  const variantClasses = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-blue-100 text-blue-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800"
  };
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-0.5 text-sm",
    lg: "px-3 py-1 text-sm"
  };
  if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0)
    $$bindings.variant(variant);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  classes = [baseClasses, variantClasses[variant], sizeClasses[size], $$props.class || ""].filter(Boolean).join(" ");
  return `<span${add_attribute("class", classes, 0)}>${slots.default ? slots.default({}) : ``}</span>`;
});
function formatTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}
function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long"
  });
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $isChecking, $$unsubscribe_isChecking;
  let $isAuthenticated, $$unsubscribe_isAuthenticated;
  let meals = [];
  let selectedDate = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  let isLoading = true;
  let error = "";
  let nutritionSummary = null;
  const { isAuthenticated, isChecking } = useAuthGuard();
  $$unsubscribe_isAuthenticated = subscribe(isAuthenticated, (value) => $isAuthenticated = value);
  $$unsubscribe_isChecking = subscribe(isChecking, (value) => $isChecking = value);
  const mealsService = new MealsService();
  const mealTypeIcons = {
    breakfast: "☀️",
    lunch: "🍽️",
    dinner: "🌙",
    snack: "🍎"
  };
  const mealTypeLabels = {
    breakfast: "Café da manhã",
    lunch: "Almoço",
    dinner: "Jantar",
    snack: "Lanche"
  };
  async function loadMealsHistory() {
    try {
      isLoading = true;
      error = "";
      const [mealsResult, nutritionResult] = await Promise.all([
        mealsService.getMealsHistory(selectedDate),
        mealsService.getDailyNutritionSummary(selectedDate)
      ]);
      meals = mealsResult.meals || [];
      nutritionSummary = nutritionResult.nutrition || null;
    } catch (err) {
      error = err.message || "Erro ao carregar histórico";
      console.error("Erro no histórico:", err);
    } finally {
      isLoading = false;
    }
  }
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      if (selectedDate) {
        loadMealsHistory();
      }
    }
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-12qrdit_START -->${$$result.title = `<title>Histórico de Refeições - MacroFit</title>`, ""}<!-- HEAD_svelte-12qrdit_END -->`, ""}  ${$isChecking ? `<div class="min-h-screen flex items-center justify-center" data-svelte-h="svelte-jouxqq"><div class="text-center"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div> <p class="text-gray-600">Verificando autenticação...</p></div></div>` : `${!$isAuthenticated ? `<div></div>` : ` <div class="min-h-screen bg-gray-50"> <header class="bg-white shadow-sm border-b"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex items-center justify-between h-16"><div class="flex items-center space-x-4"><button class="text-gray-400 hover:text-gray-600" data-svelte-h="svelte-ghdzdg"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg></button> <h1 class="text-xl font-semibold text-gray-900" data-svelte-h="svelte-1puy58l">Histórico de Refeições</h1></div> ${validate_component(Button, "Button").$$render($$result, { variant: "primary" }, {}, {
      default: () => {
        return `+ Nova Refeição`;
      }
    })}</div></div></header>  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"> <div class="mb-8">${validate_component(Card, "Card").$$render($$result, {}, {}, {
      default: () => {
        return `<div class="flex items-center justify-between"><div><h2 class="text-lg font-semibold text-gray-900" data-svelte-h="svelte-eljuv1">Selecionar Data</h2> <p class="text-sm text-gray-600">${escape(formatDate(selectedDate))}</p></div> ${validate_component(Input, "Input").$$render(
          $$result,
          {
            type: "date",
            class: "w-auto",
            value: selectedDate
          },
          {
            value: ($$value) => {
              selectedDate = $$value;
              $$settled = false;
            }
          },
          {}
        )}</div>`;
      }
    })}</div> ${isLoading ? ` <div class="text-center py-12" data-svelte-h="svelte-14rbbmj"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div> <p class="text-gray-600">Carregando histórico...</p></div>` : `${error ? ` ${validate_component(Card, "Card").$$render($$result, { padding: "lg", class: "text-center" }, {}, {
      default: () => {
        return `<div class="text-red-500 mb-4" data-svelte-h="svelte-1g5b5sd"><svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path></svg></div> <h3 class="text-lg font-medium text-gray-900 mb-2" data-svelte-h="svelte-5jc46x">Erro ao carregar histórico</h3> <p class="text-gray-600 mb-4">${escape(error)}</p> ${validate_component(Button, "Button").$$render($$result, {}, {}, {
          default: () => {
            return `Tentar novamente`;
          }
        })}`;
      }
    })}` : `<div class="grid lg:grid-cols-3 gap-8"> <div class="lg:col-span-2 space-y-6">${meals.length === 0 ? ` ${validate_component(Card, "Card").$$render($$result, { padding: "lg", class: "text-center" }, {}, {
      default: () => {
        return `<div class="text-gray-400 mb-4" data-svelte-h="svelte-a7w165"><svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg></div> <h3 class="text-lg font-medium text-gray-900 mb-2" data-svelte-h="svelte-1eaewde">Nenhuma refeição registrada</h3> <p class="text-gray-600 mb-4" data-svelte-h="svelte-19lti0s">Você ainda não registrou refeições para esta data.</p> ${validate_component(Button, "Button").$$render($$result, { variant: "primary" }, {}, {
          default: () => {
            return `Registrar primeira refeição`;
          }
        })}`;
      }
    })}` : ` ${each(meals, (meal) => {
      return `${validate_component(Card, "Card").$$render($$result, { hover: true }, {}, {
        default: () => {
          return `<div class="flex items-start justify-between"><div class="flex items-start space-x-4 flex-1"> <div class="flex-shrink-0"><div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center"><span class="text-2xl">${escape(mealTypeIcons[meal.mealType])}</span> </div></div>  <div class="flex-1 min-w-0"><div class="flex items-center space-x-2 mb-1"><h3 class="text-lg font-medium text-gray-900">${escape(mealTypeLabels[meal.mealType])}</h3> ${validate_component(Badge, "Badge").$$render($$result, { variant: "outline" }, {}, {
            default: () => {
              return `${escape(formatTime(meal.timestamp))}`;
            }
          })} ${meal.source ? `${validate_component(Badge, "Badge").$$render($$result, { variant: "secondary" }, {}, {
            default: () => {
              return `${escape(meal.source === "text" ? "📝" : meal.source === "photo" ? "📷" : "🎤")} `;
            }
          })}` : ``}</div> <p class="text-gray-600 mb-3">${escape(meal.description)}</p>  <div class="space-y-1 mb-3">${each(meal.foods, (food) => {
            return `<div class="text-sm text-gray-600">• ${escape(food.name)} - ${escape(food.quantity)}${escape(food.unit)} (${escape(food.calories)} kcal)
                            </div>`;
          })}</div>  <div class="flex items-center space-x-4 text-sm"><span class="text-red-600 font-medium">${escape(meal.totalCalories)} kcal</span> <span class="text-green-600">${escape(meal.totalProtein)}g proteína</span> <span class="text-yellow-600">${escape(meal.totalCarbs)}g carbs</span> <span class="text-purple-600">${escape(meal.totalFat)}g gordura</span></div> </div></div>  <div class="flex-shrink-0 ml-4"><button class="text-gray-400 hover:text-red-500 transition-colors" title="Excluir refeição" data-svelte-h="svelte-1e5r6z5"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button> </div></div> `;
        }
      })}`;
    })}`}</div>  <div class="space-y-6">${nutritionSummary ? `${validate_component(Card, "Card").$$render($$result, {}, {}, {
      default: () => {
        return `<h3 class="text-lg font-semibold text-gray-900 mb-4" data-svelte-h="svelte-1ffs9h4">Resumo do Dia</h3> <div class="space-y-4"> <div><div class="flex justify-between text-sm mb-1"><span data-svelte-h="svelte-1y6utfe">Calorias</span> <span>${escape(nutritionSummary.totalCalories)} / ${escape(nutritionSummary.goals.calories)}</span></div> <div class="w-full bg-gray-200 rounded-full h-2"><div class="bg-red-500 h-2 rounded-full transition-all" style="${"width: " + escape(Math.min(nutritionSummary.percentages.calories, 100), true) + "%"}"></div></div></div>  <div><div class="flex justify-between text-sm mb-1"><span data-svelte-h="svelte-14uxkx0">Proteína</span> <span>${escape(nutritionSummary.totalProtein)}g / ${escape(nutritionSummary.goals.protein)}g</span></div> <div class="w-full bg-gray-200 rounded-full h-2"><div class="bg-green-500 h-2 rounded-full transition-all" style="${"width: " + escape(Math.min(nutritionSummary.percentages.protein, 100), true) + "%"}"></div></div></div>  <div><div class="flex justify-between text-sm mb-1"><span data-svelte-h="svelte-1hhdul3">Carboidratos</span> <span>${escape(nutritionSummary.totalCarbs)}g / ${escape(nutritionSummary.goals.carbs)}g</span></div> <div class="w-full bg-gray-200 rounded-full h-2"><div class="bg-yellow-500 h-2 rounded-full transition-all" style="${"width: " + escape(Math.min(nutritionSummary.percentages.carbs, 100), true) + "%"}"></div></div></div>  <div><div class="flex justify-between text-sm mb-1"><span data-svelte-h="svelte-1o8ht59">Gorduras</span> <span>${escape(nutritionSummary.totalFat)}g / ${escape(nutritionSummary.goals.fat)}g</span></div> <div class="w-full bg-gray-200 rounded-full h-2"><div class="bg-purple-500 h-2 rounded-full transition-all" style="${"width: " + escape(Math.min(nutritionSummary.percentages.fat, 100), true) + "%"}"></div></div></div></div>`;
      }
    })}  ${validate_component(Card, "Card").$$render(
      $$result,
      {
        class: "bg-gradient-to-r from-blue-50 to-green-50"
      },
      {},
      {
        default: () => {
          return `<h3 class="text-lg font-semibold text-gray-900 mb-2" data-svelte-h="svelte-p6c67t">Calorias Restantes</h3> <div class="text-3xl font-bold text-green-600 mb-1">${escape(nutritionSummary.remaining.calories)}</div> <p class="text-sm text-gray-600">${escape(nutritionSummary.remaining.calories > 0 ? "Você ainda pode consumir" : "Você excedeu em")} ${escape(Math.abs(nutritionSummary.remaining.calories))} calorias hoje</p>`;
        }
      }
    )}` : ``}  ${validate_component(Card, "Card").$$render($$result, {}, {}, {
      default: () => {
        return `<h3 class="text-lg font-semibold text-gray-900 mb-4" data-svelte-h="svelte-1kdd069">Ações Rápidas</h3> <div class="space-y-3">${validate_component(Button, "Button").$$render(
          $$result,
          {
            variant: "primary",
            size: "sm",
            full: true
          },
          {},
          {
            default: () => {
              return `+ Adicionar Refeição`;
            }
          }
        )} ${validate_component(Button, "Button").$$render(
          $$result,
          {
            variant: "outline",
            size: "sm",
            full: true
          },
          {},
          {
            default: () => {
              return `📊 Ver Relatórios`;
            }
          }
        )} ${validate_component(Button, "Button").$$render(
          $$result,
          {
            variant: "outline",
            size: "sm",
            full: true
          },
          {},
          {
            default: () => {
              return `💡 Insights da IA`;
            }
          }
        )}</div>`;
      }
    })}</div></div>`}`}</main></div>`}`}`;
  } while (!$$settled);
  $$unsubscribe_isChecking();
  $$unsubscribe_isAuthenticated();
  return $$rendered;
});
export {
  Page as default
};
