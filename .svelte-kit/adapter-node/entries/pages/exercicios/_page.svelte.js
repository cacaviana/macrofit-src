import { c as create_ssr_component, a as subscribe, v as validate_component, e as each, d as add_attribute, b as escape } from "../../../chunks/ssr.js";
import { B as Button } from "../../../chunks/Button.js";
import { I as Input } from "../../../chunks/Input.js";
import { M as Modal } from "../../../chunks/Modal.js";
import { u as useAuthGuard } from "../../../chunks/authGuard.js";
import { U as UserService } from "../../../chunks/user.service.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let estimatedCalories;
  let $isChecking, $$unsubscribe_isChecking;
  let $isAuthenticated, $$unsubscribe_isAuthenticated;
  let showAddModal = false;
  let isAddingExercise = false;
  let exerciseName = "";
  let duration = "";
  let intensity = "moderate";
  const { isAuthenticated, isChecking } = useAuthGuard();
  $$unsubscribe_isAuthenticated = subscribe(isAuthenticated, (value) => $isAuthenticated = value);
  $$unsubscribe_isChecking = subscribe(isChecking, (value) => $isChecking = value);
  new UserService();
  const popularExercises = [
    {
      name: "Corrida",
      icon: "🏃‍♂️",
      calories: 280
    },
    {
      name: "Caminhada",
      icon: "🚶‍♂️",
      calories: 150
    },
    {
      name: "Musculação",
      icon: "🏋️‍♂️",
      calories: 320
    },
    {
      name: "Ciclismo",
      icon: "🚴‍♂️",
      calories: 450
    },
    {
      name: "Natação",
      icon: "🏊‍♂️",
      calories: 400
    },
    {
      name: "Yoga",
      icon: "🧘‍♀️",
      calories: 180
    },
    {
      name: "Pilates",
      icon: "🤸‍♀️",
      calories: 200
    },
    { name: "Dança", icon: "💃", calories: 250 }
  ];
  const intensityOptions = [
    {
      value: "low",
      label: "Baixa",
      color: "text-green-600",
      description: "Exercício leve, respiração normal"
    },
    {
      value: "moderate",
      label: "Moderada",
      color: "text-yellow-600",
      description: "Exercício moderado, respiração acelerada"
    },
    {
      value: "high",
      label: "Alta",
      color: "text-red-600",
      description: "Exercício intenso, muito suor"
    }
  ];
  function calculateCalories(name, duration2, intensity2) {
    const baseCalories = popularExercises.find((ex) => ex.name === name)?.calories || 200;
    const intensityMultiplier = { low: 0.7, moderate: 1, high: 1.3 };
    return Math.round(baseCalories * (duration2 / 60) * intensityMultiplier[intensity2]);
  }
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    estimatedCalories = exerciseName && duration ? calculateCalories(exerciseName, parseInt(duration) || 0, intensity) : 0;
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-4pxgyr_START -->${$$result.title = `<title>Exercícios - MacroFit</title>`, ""}<!-- HEAD_svelte-4pxgyr_END -->`, ""}  ${$isChecking ? `<div class="min-h-screen flex items-center justify-center" data-svelte-h="svelte-jouxqq"><div class="text-center"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div> <p class="text-gray-600">Verificando autenticação...</p></div></div>` : `${!$isAuthenticated ? `<div></div>` : ` <div class="min-h-screen bg-gray-50"> <header class="bg-white shadow-sm border-b"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex items-center justify-between h-16"><div class="flex items-center space-x-4"><button class="text-gray-400 hover:text-gray-600" data-svelte-h="svelte-ghdzdg"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg></button> <h1 class="text-xl font-semibold text-gray-900" data-svelte-h="svelte-1gkbng7">Exercícios</h1></div> ${validate_component(Button, "Button").$$render($$result, { variant: "primary" }, {}, {
      default: () => {
        return `+ Registrar Exercício`;
      }
    })}</div></div></header>  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">${` <div class="text-center py-12" data-svelte-h="svelte-1pd61bt"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div> <p class="text-gray-600">Carregando exercícios...</p></div>`}</main></div>  ${validate_component(Modal, "Modal").$$render(
      $$result,
      {
        title: "Registrar Exercício",
        size: "lg",
        open: showAddModal
      },
      {
        open: ($$value) => {
          showAddModal = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<form class="space-y-4"> ${validate_component(Input, "Input").$$render(
            $$result,
            {
              label: "Nome do exercício",
              placeholder: "Ex: Corrida, Musculação, Yoga...",
              required: true,
              value: exerciseName
            },
            {
              value: ($$value) => {
                exerciseName = $$value;
                $$settled = false;
              }
            },
            {}
          )}  ${validate_component(Input, "Input").$$render(
            $$result,
            {
              type: "number",
              label: "Duração (minutos)",
              placeholder: "30",
              min: "1",
              max: "480",
              required: true,
              value: duration
            },
            {
              value: ($$value) => {
                duration = $$value;
                $$settled = false;
              }
            },
            {}
          )}  <div><label class="block text-sm font-medium text-gray-700 mb-2" data-svelte-h="svelte-ojsw28">Intensidade</label> <div class="space-y-2">${each(intensityOptions, (option) => {
            return `<label class="flex items-center"><input type="radio"${add_attribute("value", option.value, 0)} class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"${option.value === intensity ? add_attribute("checked", true, 1) : ""}> <span class="ml-2 text-sm"><span class="${"font-medium " + escape(option.color, true)}">${escape(option.label)}</span>
                - ${escape(option.description)}</span> </label>`;
          })}</div></div>  <div><label class="block text-sm font-medium text-gray-700 mb-2" data-svelte-h="svelte-r2l7l7">Notas (opcional)</label> <textarea placeholder="Como foi o treino? Alguma observação..." rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">${escape("")}</textarea></div>  ${estimatedCalories > 0 ? `<div class="bg-orange-50 border border-orange-200 rounded-lg p-3"><div class="flex items-center"><svg class="w-5 h-5 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg> <span class="text-sm text-orange-800">Estimativa: <strong>${escape(estimatedCalories)} calorias</strong> queimadas</span></div></div>` : ``}  <div class="flex justify-end space-x-3 pt-4">${validate_component(Button, "Button").$$render(
            $$result,
            {
              type: "button",
              variant: "outline",
              disabled: isAddingExercise
            },
            {},
            {
              default: () => {
                return `Cancelar`;
              }
            }
          )} ${validate_component(Button, "Button").$$render(
            $$result,
            {
              type: "submit",
              variant: "primary",
              loading: isAddingExercise,
              disabled: !exerciseName || !duration || isAddingExercise
            },
            {},
            {
              default: () => {
                return `${`Registrar Exercício`}`;
              }
            }
          )}</div></form>`;
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
