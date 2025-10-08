import { c as create_ssr_component, h as compute_rest_props, f as createEventDispatcher, d as add_attribute, b as escape, i as spread, j as escape_attribute_value, k as escape_object } from "./ssr.js";
const baseClasses = "border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 disabled:bg-gray-50 disabled:text-gray-500";
const Input = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let inputClasses;
  let inputId;
  let $$restProps = compute_rest_props($$props, [
    "type",
    "value",
    "placeholder",
    "disabled",
    "required",
    "readonly",
    "error",
    "label",
    "id",
    "name",
    "autocomplete",
    "size",
    "full"
  ]);
  let { type = "text" } = $$props;
  let { value = "" } = $$props;
  let { placeholder = "" } = $$props;
  let { disabled = false } = $$props;
  let { required = false } = $$props;
  let { readonly = false } = $$props;
  let { error = "" } = $$props;
  let { label = "" } = $$props;
  let { id = "" } = $$props;
  let { name = "" } = $$props;
  let { autocomplete = "" } = $$props;
  let { size = "md" } = $$props;
  let { full = true } = $$props;
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-3 py-2 text-sm",
    lg: "px-4 py-3 text-base"
  };
  const errorClasses = error ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "";
  const widthClasses = full ? "w-full" : "";
  createEventDispatcher();
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.required === void 0 && $$bindings.required && required !== void 0)
    $$bindings.required(required);
  if ($$props.readonly === void 0 && $$bindings.readonly && readonly !== void 0)
    $$bindings.readonly(readonly);
  if ($$props.error === void 0 && $$bindings.error && error !== void 0)
    $$bindings.error(error);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.autocomplete === void 0 && $$bindings.autocomplete && autocomplete !== void 0)
    $$bindings.autocomplete(autocomplete);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.full === void 0 && $$bindings.full && full !== void 0)
    $$bindings.full(full);
  inputClasses = [
    baseClasses,
    sizeClasses[size],
    errorClasses,
    widthClasses,
    $$props.class || ""
  ].filter(Boolean).join(" ");
  inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  return `<div class="space-y-1">${label ? `<label${add_attribute("for", inputId, 0)} class="block text-sm font-medium text-gray-700">${escape(label)} ${required ? `<span class="text-red-500" data-svelte-h="svelte-1n3raya">*</span>` : ``}</label>` : ``} ${type === "textarea" ? `<textarea${spread(
    [
      {
        placeholder: escape_attribute_value(placeholder)
      },
      { disabled: disabled || null },
      { required: required || null },
      { readonly: readonly || null },
      { name: escape_attribute_value(name) },
      {
        autocomplete: escape_attribute_value(autocomplete)
      },
      { id: escape_attribute_value(inputId) },
      {
        class: escape_attribute_value(inputClasses)
      },
      escape_object($$restProps)
    ],
    {}
  )}>${escape(value || "")}</textarea>` : `${type === "email" ? `<input${spread(
    [
      { type: "email" },
      {
        placeholder: escape_attribute_value(placeholder)
      },
      { disabled: disabled || null },
      { required: required || null },
      { readonly: readonly || null },
      { name: escape_attribute_value(name) },
      {
        autocomplete: escape_attribute_value(autocomplete)
      },
      { id: escape_attribute_value(inputId) },
      {
        class: escape_attribute_value(inputClasses)
      },
      escape_object($$restProps)
    ],
    {}
  )}${add_attribute("value", value, 0)}>` : `${type === "password" ? `<input${spread(
    [
      { type: "password" },
      {
        placeholder: escape_attribute_value(placeholder)
      },
      { disabled: disabled || null },
      { required: required || null },
      { readonly: readonly || null },
      { name: escape_attribute_value(name) },
      {
        autocomplete: escape_attribute_value(autocomplete)
      },
      { id: escape_attribute_value(inputId) },
      {
        class: escape_attribute_value(inputClasses)
      },
      escape_object($$restProps)
    ],
    {}
  )}${add_attribute("value", value, 0)}>` : `${type === "number" ? `<input${spread(
    [
      { type: "number" },
      {
        placeholder: escape_attribute_value(placeholder)
      },
      { disabled: disabled || null },
      { required: required || null },
      { readonly: readonly || null },
      { name: escape_attribute_value(name) },
      {
        autocomplete: escape_attribute_value(autocomplete)
      },
      { id: escape_attribute_value(inputId) },
      {
        class: escape_attribute_value(inputClasses)
      },
      escape_object($$restProps)
    ],
    {}
  )}${add_attribute("value", value, 0)}>` : `<input${spread(
    [
      { type: "text" },
      {
        placeholder: escape_attribute_value(placeholder)
      },
      { disabled: disabled || null },
      { required: required || null },
      { readonly: readonly || null },
      { name: escape_attribute_value(name) },
      {
        autocomplete: escape_attribute_value(autocomplete)
      },
      { id: escape_attribute_value(inputId) },
      {
        class: escape_attribute_value(inputClasses)
      },
      escape_object($$restProps)
    ],
    {}
  )}${add_attribute("value", value, 0)}>`}`}`}`} ${error ? `<p class="text-sm text-red-600">${escape(error)}</p>` : ``}</div>`;
});
export {
  Input as I
};
