export type SerializableSet<TContents> = TContents[];
export type Form = SerializableSet<FormElement>;
export type FormElement = number;

export function areFormsEqual(left: Form, right: Form): boolean {
  const isSameLength = left.length === right.length;
  if (!isSameLength) return false;

  const combinedSet = new Set([...left, ...right]);
  const bothContainSameElements = combinedSet.size === left.length;

  return bothContainSameElements;
}

export function areFormElementsUnique(form: Form): boolean {
  const areNoDuplicates = new Set(form).size === form.length;
  return areNoDuplicates;
}

/**
 * TODO: Ensure safety of escape sequences
 */
export function serialize(form: Form): string {
  return JSON.stringify(form);
}

/**
 * TODO: Ensure safety of escape sequences
 */
export function parse(form: string) {
  const result = JSON.parse(form) as unknown;

  const isArray = Array.isArray(result);
  if (!isArray)
    return error("Could not parse text to Form: Result should be array type");

  const elementsAreNumbers = result.every((element) =>
    Number.isFinite(element)
  );
  if (!elementsAreNumbers)
    return error(
      "Could not parse text to Form: Result should only contain numbers"
    );

  const elementsAreUnique = areFormElementsUnique(result);
  if (!elementsAreUnique)
    return error("Could not parse text to Form: Result should be array type");

  return ok(result as Form);
}

export function areFormElementsEqual(
  formElementA: number,
  formElementB: number
): boolean {
  return formElementA === formElementB;
}

export function copy(formElement: FormElement): FormElement {
  return formElement;
}

/**
 * TODO: Ensure safety of escape sequences
 */
export function serializeFormElement(element: FormElement): string {
  return JSON.stringify(element);
}

/**
 * TODO: Ensure safety of escape sequences
 */
export function parseFormElement(element: string) {
  const result = Number(element);
  const isNumber = Number.isFinite(result);

  if (!isNumber)
    return error(
      "Could not parse text to FormElement: Result should be a number"
    );

  return ok(result);
}

/**
 * Inspired by the design of rusts Result enum
 * https://doc.rust-lang.org/std/result/
 */
interface IResult<TValue, TError extends string> {
  isOk: boolean;
  isError: boolean;
  unwrap: () => TValue;
  unwrapError: () => TError;
  unwrapOr: <TDefault>(value: TDefault) => TValue | TDefault;
  map: <TValueAfter, TErrorAfter extends string>(
    operation: (value: TValue) => Result<TValueAfter, TErrorAfter>
  ) => Result<TValueAfter, TErrorAfter | TError>;
  mapError: <TErrorAfter extends string>(
    operation: (value: TError) => Result<TValue, TErrorAfter>
  ) => Result<TValue, TErrorAfter>;
}

type Result<TValue, TError extends string> = Ok<TValue> | Err<TError>;
interface Ok<TValue> extends IResult<TValue, never> {
  isOk: true;
  isError: false;
}
export function ok<TValue>(value: TValue): Ok<TValue> {
  return {
    isOk: true,
    isError: false,
    unwrap: () => value,
    unwrapOr: () => value,
    unwrapError: () => {
      throw new Error(`Cannot unwrap error: No error contained`);
    },
    map: (operation) => operation(value),
    mapError: () => ok(value),
  };
}
interface Err<TError extends string> extends IResult<never, TError> {
  isOk: false;
  isError: true;
}
export function error<TError extends string>(message: TError): Err<TError> {
  return {
    isOk: false,
    isError: true,
    unwrap: () => {
      throw new Error(`Cannot unwrap value: ${message}`);
    },
    unwrapOr: (value) => value,
    unwrapError: () => message,
    map: () => error(message),
    mapError: (operation) => operation(message),
  };
}

export function result<TValue, TError extends string>(
  value: Ok<TValue> | Err<TError>
): Result<TValue, TError> {
  return value;
}
