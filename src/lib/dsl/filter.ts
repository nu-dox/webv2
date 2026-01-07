import type { FilteredExpression } from "./parser";

export function applyFilters<T>(data: T[], filters: FilteredExpression[]): T[] {
  return data.filter(item => {
    return filters.every(filter => {
      const itemValue = (item as any)[filter.field];
      switch (filter.operator) {
        case ":":
        case "=":
          return String(itemValue).toLowerCase().includes(String(filter.value).toLowerCase());
        case ">":
          return itemValue > filter.value;
        case "<":
          return itemValue < filter.value;
        case ">=":
          return itemValue >= filter.value;
        case "<=":
          return itemValue <= filter.value;
        default:
          return true;
      }
    });
  });
}