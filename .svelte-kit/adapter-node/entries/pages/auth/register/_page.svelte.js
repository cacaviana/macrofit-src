import { c as create_ssr_component, v as validate_component, d as add_attribute } from "../../../../chunks/ssr.js";
import { B as Button } from "../../../../chunks/Button.js";
import { C as Card } from "../../../../chunks/Card.js";
import { I as Input } from "../../../../chunks/Input.js";
import { A as AuthService } from "../../../../chunks/auth.service.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let name = "";
  let email = "";
  let password = "";
  let confirmPassword = "";
  let acceptTerms = false;
  let isLoading = false;
  new AuthService();
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-1jypr03_START -->${$$result.title = `<title>Criar Conta - MacroFit</title>`, ""}<!-- HEAD_svelte-1jypr03_END -->`, ""} <div class="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4"><div class="w-full max-w-md"> <div class="text-center mb-8" data-svelte-h="svelte-1nyjgs0"><div class="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4"><svg class="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path></svg></div> <h1 class="text-3xl font-bold text-white mb-2">MacroFit</h1> <p class="text-blue-100">Crie sua conta gratuita</p></div>  ${validate_component(Card, "Card").$$render(
      $$result,
      {
        padding: "lg",
        class: "backdrop-blur-sm bg-white/95"
      },
      {},
      {
        default: () => {
          return `<div class="space-y-6"><div class="text-center" data-svelte-h="svelte-2s02vm"><h2 class="text-2xl font-semibold text-gray-900">Criar conta</h2> <p class="text-gray-600 mt-2">Comece sua jornada nutricional hoje</p></div>  <form class="space-y-4"> ${validate_component(Input, "Input").$$render(
            $$result,
            {
              type: "text",
              label: "Nome completo",
              placeholder: "Seu nome",
              required: true,
              disabled: isLoading,
              value: name
            },
            {
              value: ($$value) => {
                name = $$value;
                $$settled = false;
              }
            },
            {}
          )}  ${validate_component(Input, "Input").$$render(
            $$result,
            {
              type: "email",
              label: "E-mail",
              placeholder: "seu@email.com",
              required: true,
              disabled: isLoading,
              value: email
            },
            {
              value: ($$value) => {
                email = $$value;
                $$settled = false;
              }
            },
            {}
          )}  ${validate_component(Input, "Input").$$render(
            $$result,
            {
              type: "password",
              label: "Senha",
              placeholder: "Mínimo 8 caracteres",
              required: true,
              disabled: isLoading,
              value: password
            },
            {
              value: ($$value) => {
                password = $$value;
                $$settled = false;
              }
            },
            {}
          )}  ${validate_component(Input, "Input").$$render(
            $$result,
            {
              type: "password",
              label: "Confirmar senha",
              placeholder: "Digite a senha novamente",
              required: true,
              disabled: isLoading,
              value: confirmPassword
            },
            {
              value: ($$value) => {
                confirmPassword = $$value;
                $$settled = false;
              }
            },
            {}
          )}  <div class="flex items-start"><input type="checkbox" ${""} class="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500" required${add_attribute("checked", acceptTerms, 1)}> <label class="ml-2 text-sm text-gray-600" data-svelte-h="svelte-1l8e671">Aceito os <a href="/termos" class="text-blue-600 hover:text-blue-500">Termos de Uso</a> 
              e <a href="/privacidade" class="text-blue-600 hover:text-blue-500">Política de Privacidade</a></label></div>  ${``}  ${validate_component(Button, "Button").$$render(
            $$result,
            {
              type: "submit",
              variant: "primary",
              size: "lg",
              full: true,
              loading: isLoading,
              disabled: isLoading
            },
            {},
            {
              default: () => {
                return `${`Criar conta gratuita`}`;
              }
            }
          )}</form>  <div class="text-center"><p class="text-sm text-gray-600">Já tem uma conta?
            <button type="button" ${""} class="text-blue-600 hover:text-blue-500 font-medium disabled:opacity-50">Fazer login</button></p></div></div>`;
        }
      }
    )}</div></div>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
