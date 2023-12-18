
/** Utility function to create a K:V from a list of strings */

export const isObjectLiteral = (obj?: unknown): obj is Object =>
  typeof obj == "object" && obj instanceof Object && !Array.isArray(obj);


/** Utility function to create a K:V from a list of strings */
export const strEnum = <T extends string>(o: Array<T>): { [K in T]: K } =>
o.reduce((res, key) => {
  res[key] = key;
  return res;
}, Object.create(null))

export const PersonAuthEnum = strEnum(["parent", "teacher", "student"])
export type PersonAuthType = keyof typeof PersonAuthEnum

export const arrToRegEx = (arr: string[]) => new RegExp(`^(${arr.join("|")})$`)
export type TFAnswerType = "true" | "false";


export type GradeType =
  | "pre-kg"
  | "kg"
  | "lkg"
  | "hkg"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12";

export type BoardType = "geneo" | "cbse" | "icse";
export type LevelType = "high" | "medium" | "low";

export const ContextTypeEnum = strEnum(["direct", "enhanced", "genius"])
export type ContentContextType = keyof typeof ContextTypeEnum

