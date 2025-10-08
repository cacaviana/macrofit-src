import { c as create_ssr_component, v as validate_component, d as add_attribute } from "../../../../chunks/ssr.js";
import { B as Button } from "../../../../chunks/Button.js";
import { C as Card } from "../../../../chunks/Card.js";
import { I as Input } from "../../../../chunks/Input.js";
import { A as AuthService } from "../../../../chunks/auth.service.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let email = "";
  let password = "";
  let rememberMe = false;
  let isLoading = false;
  new AuthService();
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-1izno4u_START -->${$$result.title = `<title>Login - MacroFit</title>`, ""}<!-- HEAD_svelte-1izno4u_END -->`, ""} <div class="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4"><div class="w-full max-w-md"> <div class="text-center mb-8" data-svelte-h="svelte-yew80j"><div class="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4"><svg class="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path></svg></div> <h1 class="text-3xl font-bold text-white mb-2">MacroFit</h1> <p class="text-blue-100">Seu coach nutricional com inteligência artificial</p></div>  ${validate_component(Card, "Card").$$render(
      $$result,
      {
        padding: "lg",
        class: "backdrop-blur-sm bg-white/95"
      },
      {},
      {
        default: () => {
          return `<div class="space-y-6"> <div class="text-center" data-svelte-h="svelte-w8gbak"><h2 class="text-2xl font-semibold text-gray-900">Bem-vindo de volta</h2> <p class="text-gray-600 mt-2">Entre na sua conta para continuar sua jornada nutricional</p></div>  <form class="space-y-4"> ${validate_component(Input, "Input").$$render(
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
              placeholder: "••••••••",
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
          )}  <div class="flex items-center justify-between"><label class="flex items-center"><input type="checkbox" ${""} class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"${add_attribute("checked", rememberMe, 1)}> <span class="ml-2 text-sm text-gray-600" data-svelte-h="svelte-1022ufc">Lembrar de mim</span></label> <button type="button" ${""} class="text-sm text-blue-600 hover:text-blue-500 disabled:opacity-50">Esqueci a senha</button></div>  ${``}  ${validate_component(Button, "Button").$$render(
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
                return `${`Entrar`}`;
              }
            }
          )}</form>  <div class="relative" data-svelte-h="svelte-1seb8rh"><div class="absolute inset-0 flex items-center"><div class="w-full border-t border-gray-300"></div></div> <div class="relative flex justify-center text-sm"><span class="px-2 bg-white text-gray-500">ou continue com</span></div></div>  <div class="grid grid-cols-2 gap-3">${validate_component(Button, "Button").$$render(
            $$result,
            {
              variant: "outline",
              size: "md",
              full: true,
              disabled: isLoading
            },
            {},
            {
              default: () => {
                return `<svg class="w-5 h-5 mr-2" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"></path><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"></path><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"></path><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"></path></svg>
            Google`;
              }
            }
          )} ${validate_component(Button, "Button").$$render(
            $$result,
            {
              variant: "outline",
              size: "md",
              full: true,
              disabled: isLoading
            },
            {},
            {
              default: () => {
                return `<svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"></path></svg>
            Apple`;
              }
            }
          )}</div>  <div class="text-center"><p class="text-sm text-gray-600">Não tem uma conta?
            <button type="button" ${""} class="text-blue-600 hover:text-blue-500 font-medium disabled:opacity-50">Criar conta gratuita</button></p></div>  <div class="flex items-center justify-center text-xs text-gray-500" data-svelte-h="svelte-1nyg6hw"><svg class="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
          Seus dados estão seguros</div></div>`;
        }
      }
    )}  <div class="mt-8 text-center text-sm text-blue-100 space-x-4" data-svelte-h="svelte-172keag"><a href="/termos" class="hover:text-white">Termos de Uso</a> <span>•</span> <a href="/privacidade" class="hover:text-white">Privacidade</a> <span>•</span> <a href="/ajuda" class="hover:text-white">Ajuda</a></div></div></div>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
