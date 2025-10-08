import { c as create_ssr_component, d as add_attribute } from "./ssr.js";
const baseClasses = "bg-white border border-gray-200";
const Card = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classes;
  let { padding = "default" } = $$props;
  let { shadow = "default" } = $$props;
  let { hover = false } = $$props;
  let { clickable = false } = $$props;
  let { rounded = true } = $$props;
  const paddingClasses = {
    none: "",
    sm: "p-4",
    default: "p-6",
    lg: "p-8"
  };
  const shadowClasses = {
    none: "",
    sm: "shadow-sm",
    default: "shadow",
    lg: "shadow-lg"
  };
  const hoverClasses = hover ? "hover:shadow-md transition-shadow duration-200" : "";
  const clickableClasses = clickable ? "cursor-pointer" : "";
  const roundedClasses = rounded ? "rounded-lg" : "";
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  if ($$props.shadow === void 0 && $$bindings.shadow && shadow !== void 0)
    $$bindings.shadow(shadow);
  if ($$props.hover === void 0 && $$bindings.hover && hover !== void 0)
    $$bindings.hover(hover);
  if ($$props.clickable === void 0 && $$bindings.clickable && clickable !== void 0)
    $$bindings.clickable(clickable);
  if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0)
    $$bindings.rounded(rounded);
  classes = [
    baseClasses,
    paddingClasses[padding],
    shadowClasses[shadow],
    hoverClasses,
    clickableClasses,
    roundedClasses,
    $$props.class || ""
  ].filter(Boolean).join(" ");
  return `<div${add_attribute("class", classes, 0)}${add_attribute("role", clickable ? "button" : void 0, 0)}${add_attribute("tabindex", clickable ? 0 : void 0, 0)}>${slots.default ? slots.default({}) : ``}</div>`;
});
export {
  Card as C
};
