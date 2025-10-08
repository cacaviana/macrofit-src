import { c as create_ssr_component, a as subscribe, v as validate_component, b as escape } from "../../../chunks/ssr.js";
import { B as Button } from "../../../chunks/Button.js";
import { C as Card } from "../../../chunks/Card.js";
import { u as useAuthGuard } from "../../../chunks/authGuard.js";
import { U as UserService } from "../../../chunks/user.service.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let imc;
  let imcClass;
  let imcColor;
  let $isChecking, $$unsubscribe_isChecking;
  let $isAuthenticated, $$unsubscribe_isAuthenticated;
  let user = {
    name: "Usuário Demo",
    email: "usuario@macrofit.com",
    currentWeight: 70,
    targetWeight: 65,
    height: 175,
    age: 30,
    gender: "male",
    activityLevel: "moderate",
    goal: "lose_weight"
  };
  const { isAuthenticated, isChecking } = useAuthGuard();
  $$unsubscribe_isAuthenticated = subscribe(isAuthenticated, (value) => $isAuthenticated = value);
  $$unsubscribe_isChecking = subscribe(isChecking, (value) => $isChecking = value);
  new UserService();
  const genderLabels = {
    "male": "👨 Masculino",
    "female": "👩 Feminino"
  };
  const activityLabels = {
    "sedentary": "Sedentário",
    "light": "Leve",
    "moderate": "Moderado",
    "active": "Ativo"
  };
  const goalLabels = {
    "lose_weight": "📉 Perder peso",
    "maintain_weight": "⚖️ Manter peso",
    "gain_weight": "📈 Ganhar peso"
  };
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    imc = (user.currentWeight / Math.pow(user.height / 100, 2)).toFixed(1);
    imcClass = imc < 18.5 ? "Abaixo do peso" : imc < 25 ? "Peso normal" : imc < 30 ? "Sobrepeso" : "Obesidade";
    imcColor = imc < 18.5 ? "text-blue-600" : imc < 25 ? "text-green-600" : imc < 30 ? "text-yellow-600" : "text-red-600";
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-28vhox_START -->${$$result.title = `<title>Perfil - MacroFit</title>`, ""}<!-- HEAD_svelte-28vhox_END -->`, ""} ${$isChecking ? `<div class="flex items-center justify-center min-h-screen" data-svelte-h="svelte-1i2is2c"><div class="text-center"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div> <p class="text-gray-600">Verificando autenticação...</p></div></div>` : `${!$isAuthenticated ? `<div class="flex items-center justify-center min-h-screen"><div class="text-center"><h2 class="text-2xl font-bold text-gray-900 mb-4" data-svelte-h="svelte-1vqw04x">Acesso Negado</h2> <p class="text-gray-600 mb-4" data-svelte-h="svelte-x0mjto">Você precisa estar logado para acessar esta página.</p> ${validate_component(Button, "Button").$$render($$result, {}, {}, {
      default: () => {
        return `Fazer Login`;
      }
    })}</div></div>` : `<div class="container mx-auto px-4 py-8"><div class="max-w-4xl mx-auto"> <div class="mb-8"><div class="flex justify-between items-center"><div data-svelte-h="svelte-10cbbm0"><h1 class="text-3xl font-bold text-gray-900 mb-2">👤 Meu Perfil</h1> <p class="text-gray-600">Visualize e edite suas informações pessoais</p></div> <div class="flex space-x-2">${`${validate_component(Button, "Button").$$render($$result, { class: "bg-blue-500 hover:bg-blue-600" }, {}, {
      default: () => {
        return `✏️ Editar Perfil`;
      }
    })}`}</div></div>  ${``} ${``}</div> <div class="grid grid-cols-1 lg:grid-cols-3 gap-8"> <div class="lg:col-span-2">${validate_component(Card, "Card").$$render($$result, { class: "p-6" }, {}, {
      default: () => {
        return `<h2 class="text-xl font-semibold mb-6" data-svelte-h="svelte-hzvwa9">Informações Pessoais</h2> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-gray-700 mb-2" data-svelte-h="svelte-1rdcnz7">Nome</label> ${`<p class="text-gray-900 font-medium">${escape(user.name)}</p>`}</div> <div><label class="block text-sm font-medium text-gray-700 mb-2" data-svelte-h="svelte-b6onm6">Email</label> ${`<p class="text-gray-900">${escape(user.email)}</p>`}</div> <div><label class="block text-sm font-medium text-gray-700 mb-2" data-svelte-h="svelte-zkr18j">Idade</label> ${`<p class="text-gray-900">${escape(user.age)} anos</p>`}</div> <div><label class="block text-sm font-medium text-gray-700 mb-2" data-svelte-h="svelte-izkey5">Gênero</label> ${`<p class="text-gray-900">${escape(genderLabels[user.gender])}</p>`}</div> <div><label class="block text-sm font-medium text-gray-700 mb-2" data-svelte-h="svelte-19waixg">Altura (cm)</label> ${`<p class="text-gray-900">${escape(user.height)} cm</p>`}</div> <div><label class="block text-sm font-medium text-gray-700 mb-2" data-svelte-h="svelte-1ey043l">Peso Atual (kg)</label> ${`<p class="text-gray-900">${escape(user.currentWeight)} kg</p>`}</div> <div><label class="block text-sm font-medium text-gray-700 mb-2" data-svelte-h="svelte-iy596l">Peso Meta (kg)</label> ${`<p class="text-gray-900">${escape(user.targetWeight)} kg</p>`}</div> <div><label class="block text-sm font-medium text-gray-700 mb-2" data-svelte-h="svelte-16m2npk">Nível de Atividade</label> ${`<p class="text-gray-900">${escape(activityLabels[user.activityLevel])}</p>`}</div> <div class="md:col-span-2"><label class="block text-sm font-medium text-gray-700 mb-2" data-svelte-h="svelte-1i830bi">Objetivo</label> ${`<p class="text-gray-900">${escape(goalLabels[user.goal])}</p>`}</div></div>`;
      }
    })}</div>  <div class="space-y-6"> ${validate_component(Card, "Card").$$render($$result, { class: "p-6" }, {}, {
      default: () => {
        return `<h3 class="text-lg font-semibold mb-4" data-svelte-h="svelte-1wk0pg1">📊 Estatísticas</h3> <div class="space-y-4"><div><div class="flex justify-between items-center mb-2"><span class="text-sm font-medium text-gray-700" data-svelte-h="svelte-h2vln4">IMC</span> <span class="${"text-2xl font-bold " + escape(imcColor, true)}">${escape(imc)}</span></div> <p class="text-sm text-gray-600">${escape(imcClass)}</p></div> <div><div class="flex justify-between items-center mb-2"><span class="text-sm font-medium text-gray-700" data-svelte-h="svelte-167ies9">Para perder</span> <span class="text-lg font-semibold text-red-600">${escape((user.currentWeight - user.targetWeight).toFixed(1))} kg</span></div></div></div>`;
      }
    })}  ${validate_component(Card, "Card").$$render($$result, { class: "p-6" }, {}, {
      default: () => {
        return `<h3 class="text-lg font-semibold mb-4" data-svelte-h="svelte-1vvw6t1">⚡ Ações Rápidas</h3> <div class="space-y-3">${validate_component(Button, "Button").$$render(
          $$result,
          {
            class: "w-full bg-blue-500 hover:bg-blue-600 text-left justify-start"
          },
          {},
          {
            default: () => {
              return `⚙️ Configurações Avançadas`;
            }
          }
        )} ${validate_component(Button, "Button").$$render(
          $$result,
          {
            class: "w-full bg-green-500 hover:bg-green-600 text-left justify-start"
          },
          {},
          {
            default: () => {
              return `📊 Ver Histórico`;
            }
          }
        )} ${validate_component(Button, "Button").$$render(
          $$result,
          {
            class: "w-full bg-purple-500 hover:bg-purple-600 text-left justify-start"
          },
          {},
          {
            default: () => {
              return `📈 Relatórios`;
            }
          }
        )}</div>`;
      }
    })}</div></div></div></div>`}`}`;
  } while (!$$settled);
  $$unsubscribe_isChecking();
  $$unsubscribe_isAuthenticated();
  return $$rendered;
});
export {
  Page as default
};
