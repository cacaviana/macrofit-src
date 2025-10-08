import { c as create_ssr_component, f as createEventDispatcher, d as add_attribute, b as escape } from "./ssr.js";
const Modal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { open = false } = $$props;
  let { title = "" } = $$props;
  let { size = "md" } = $$props;
  let { closable = true } = $$props;
  let { closeOnBackdrop = true } = $$props;
  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl"
  };
  createEventDispatcher();
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.closable === void 0 && $$bindings.closable && closable !== void 0)
    $$bindings.closable(closable);
  if ($$props.closeOnBackdrop === void 0 && $$bindings.closeOnBackdrop && closeOnBackdrop !== void 0)
    $$bindings.closeOnBackdrop(closeOnBackdrop);
  return `${open ? ` <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true"${add_attribute("aria-labelledby", title ? "modal-title" : void 0, 0)}> <div class="${"bg-white rounded-lg shadow-xl w-full " + escape(sizeClasses[size], true) + " max-h-[90vh] overflow-hidden"}"> ${title || closable ? `<div class="flex items-center justify-between p-6 border-b border-gray-200">${title ? `<h2 id="modal-title" class="text-lg font-semibold text-gray-900">${escape(title)}</h2>` : `<div></div>`} ${closable ? `<button type="button" class="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Fechar modal" data-svelte-h="svelte-1b5pcp1"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>` : ``}</div>` : ``}  <div class="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">${slots.default ? slots.default({}) : ``}</div>  ${slots.footer ? slots.footer({}) : ``}</div></div>` : ``}`;
});
export {
  Modal as M
};
