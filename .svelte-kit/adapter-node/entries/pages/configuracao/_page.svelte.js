import { c as create_ssr_component, a as subscribe, b as escape, v as validate_component } from "../../../chunks/ssr.js";
import { B as Button } from "../../../chunks/Button.js";
import { C as Card } from "../../../chunks/Card.js";
import { I as Input } from "../../../chunks/Input.js";
import { u as useAuthGuard } from "../../../chunks/authGuard.js";
import { U as UserService } from "../../../chunks/user.service.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $isChecking, $$unsubscribe_isChecking;
  let $isAuthenticated, $$unsubscribe_isAuthenticated;
  let currentStep = 1;
  let currentWeight = "";
  let targetWeight = "";
  let height = "";
  let age = "";
  let gender = "";
  let activityLevel = "";
  let goal = "";
  const { isAuthenticated, isChecking } = useAuthGuard();
  $$unsubscribe_isAuthenticated = subscribe(isAuthenticated, (value) => $isAuthenticated = value);
  $$unsubscribe_isChecking = subscribe(isChecking, (value) => $isChecking = value);
  new UserService();
  function canProceed() {
    switch (currentStep) {
      case 1:
        return currentWeight && targetWeight && height && age;
      case 2:
        return gender;
      case 3:
        return activityLevel;
      case 4:
        return goal;
      default:
        return false;
    }
  }
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-1hvhpmz_START -->${$$result.title = `<title>Configuração Inicial - MacroFit</title>`, ""}<!-- HEAD_svelte-1hvhpmz_END -->`, ""}  ${$isChecking ? `<div class="min-h-screen flex items-center justify-center" data-svelte-h="svelte-jouxqq"><div class="text-center"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div> <p class="text-gray-600">Verificando autenticação...</p></div></div>` : `${!$isAuthenticated ? `<div></div>` : ` <div class="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4"><div class="w-full max-w-2xl"> <div class="text-center mb-8" data-svelte-h="svelte-ylwvl7"><h1 class="text-3xl font-bold text-white mb-2">Vamos configurar seu perfil</h1> <p class="text-blue-100">Isso nos ajudará a personalizar suas metas nutricionais</p></div>  <div class="mb-8"><div class="flex items-center justify-between text-white text-sm mb-2"><span>Passo ${escape(currentStep)} de 4</span> <span>${escape(Math.round(currentStep / 4 * 100))}% completo</span></div> <div class="w-full bg-white/20 rounded-full h-2"><div class="bg-white rounded-full h-2 transition-all duration-300" style="${"width: " + escape(currentStep / 4 * 100, true) + "%"}"></div></div></div>  ${validate_component(Card, "Card").$$render(
      $$result,
      {
        padding: "lg",
        class: "backdrop-blur-sm bg-white/95"
      },
      {},
      {
        default: () => {
          return `${` <div class="space-y-6"><div class="text-center" data-svelte-h="svelte-1g2att0"><h2 class="text-2xl font-semibold text-gray-900 mb-2">Dados físicos</h2> <p class="text-gray-600">Precisamos conhecer suas medidas atuais</p></div> <div class="grid md:grid-cols-2 gap-4">${validate_component(Input, "Input").$$render(
            $$result,
            {
              type: "number",
              label: "Peso atual (kg)",
              placeholder: "70",
              step: "0.1",
              min: "30",
              max: "300",
              required: true,
              value: currentWeight
            },
            {
              value: ($$value) => {
                currentWeight = $$value;
                $$settled = false;
              }
            },
            {}
          )} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              type: "number",
              label: "Peso desejado (kg)",
              placeholder: "65",
              step: "0.1",
              min: "30",
              max: "300",
              required: true,
              value: targetWeight
            },
            {
              value: ($$value) => {
                targetWeight = $$value;
                $$settled = false;
              }
            },
            {}
          )} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              type: "number",
              label: "Altura (cm)",
              placeholder: "170",
              min: "100",
              max: "250",
              required: true,
              value: height
            },
            {
              value: ($$value) => {
                height = $$value;
                $$settled = false;
              }
            },
            {}
          )} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              type: "number",
              label: "Idade (anos)",
              placeholder: "25",
              min: "13",
              max: "120",
              required: true,
              value: age
            },
            {
              value: ($$value) => {
                age = $$value;
                $$settled = false;
              }
            },
            {}
          )}</div></div>`}  <div class="flex justify-between mt-8">${validate_component(Button, "Button").$$render(
            $$result,
            {
              variant: "outline",
              disabled: currentStep === 1
            },
            {},
            {
              default: () => {
                return `Voltar`;
              }
            }
          )} ${`${validate_component(Button, "Button").$$render(
            $$result,
            {
              variant: "primary",
              disabled: !canProceed()
            },
            {},
            {
              default: () => {
                return `Próximo`;
              }
            }
          )}`}</div>`;
        }
      }
    )}  <div class="text-center mt-6 text-blue-100 text-sm" data-svelte-h="svelte-1o0msm7"><p>🔒 Seus dados são criptografados e mantidos em segurança</p></div></div></div>`}`}`;
  } while (!$$settled);
  $$unsubscribe_isChecking();
  $$unsubscribe_isAuthenticated();
  return $$rendered;
});
export {
  Page as default
};
