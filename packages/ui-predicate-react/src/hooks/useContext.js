import { useContext } from "react";
import { UIPredicateContext } from "../contexts";

export function useUIPredicateContext() {
  const context = useContext(UIPredicateContext);

  if (!context) {
    throw new Error(
      "The component needs to be wrapped in the `UIPredicate` component."
    );
  }

  return context;
}
