import * as tlds from "./tlds.json";

export function getTldInfo(tldType: "HNS" | "ICANN"): string[] {
  return tlds[tldType] || [];
}
