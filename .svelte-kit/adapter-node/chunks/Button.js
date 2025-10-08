import { c as create_ssr_component, h as compute_rest_props, f as createEventDispatcher, i as spread, j as escape_attribute_value, k as escape_object } from "./ssr.js";
const baseClasses = "inline-flex items-center justify-center font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
const Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classes;
  let $$restProps = compute_rest_props($$props, ["variant", "size", "disabled", "loading", "type", "href", "full", "rounded"]);
  let { variant = "primary" } = $$props;
  let { size = "md" } = $$props;
  let { disabled = false } = $$props;
  let { loading = false } = $$props;
  let { type = "button" } = $$props;
  let { href = null } = $$props;
  let { full = false } = $$props;
  let { rounded = true } = $$props;
  const variantClasses = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500",
    success: "bg-green-500 text-white hover:bg-green-600 focus:ring-green-500",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
    outline: "border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white focus:ring-blue-500"
  };
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };
  createEventDispatcher();
  if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0)
    $$bindings.variant(variant);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.loading === void 0 && $$bindings.loading && loading !== void 0)
    $$bindings.loading(loading);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.full === void 0 && $$bindings.full && full !== void 0)
    $$bindings.full(full);
  if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0)
    $$bindings.rounded(rounded);
  classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    rounded ? "rounded-lg" : "",
    full ? "w-full" : "",
    $$props.class || ""
  ].filter(Boolean).join(" ");
  return `${href ? `<a${spread(
    [
      { href: escape_attribute_value(href) },
      { class: escape_attribute_value(classes) },
      escape_object($$restProps)
    ],
    {
      classes: disabled ? "pointer-events-none" : ""
    }
  )}>${loading ? `<svg class="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>` : ``} ${slots.default ? slots.default({}) : ``}</a>` : `<button${spread(
    [
      { type: escape_attribute_value(type) },
      { disabled: disabled || null },
      { class: escape_attribute_value(classes) },
      escape_object($$restProps)
    ],
    {}
  )}>${loading ? `<svg class="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>` : ``} ${slots.default ? slots.default({}) : ``}</button>`}`;
});
export {
  Button as B
};
