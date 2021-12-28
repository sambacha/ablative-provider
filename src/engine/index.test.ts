import {
  areFormElementsEqual,
  areFormElementsUnique,
  areFormsEqual,
  copy,
  error,
  Form,
  FormElement,
  ok,
  parse,
  parseFormElement,
  result,
  serialize,
  serializeFormElement,
} from "./index";

describe("Form", () => {
  // Form - 1 - Two forms containing the same elements are considered equivalent
  test("Can check if two forms are equal", () => {
    const formA: Form = [1, 2, 3];
    const formB: Form = [1, 2, 3];
    expect(areFormsEqual(formA, formB)).toBeTruthy();
  });

  test("Can check if two forms are unequal", () => {
    const formA: Form = [1, 2, 3];
    const formB: Form = [3, 4, 5];
    expect(areFormsEqual(formA, formB)).toBeFalsy();
  });

  test("Can check if two empty forms are equal", () => {
    const formA: Form = [];
    const formB: Form = [];
    expect(areFormsEqual(formA, formB)).toBeTruthy();
  });

  test("Can check if two forms with some differing elements are unequal", () => {
    const formA: Form = [1, 2];
    const formB: Form = [1, 4];
    expect(areFormsEqual(formA, formB)).toBeFalsy();
  });

  // Form Assumption 2 - Order does not matter
  test("Can equate non ordered forms", () => {
    const formA: Form = [1, 2, 3];
    const formB: Form = [3, 1, 2];
    expect(areFormsEqual(formA, formB)).toBeTruthy();
  });

  // Form - 2 Non-ambiguous elements - must not contain the same element more than once

  test("Can check for uniqueness of form elements", () => {
    const form = [1, 2, 3];
    expect(areFormElementsUnique(form)).toBeTruthy();
  });

  test("Can check for duplicate form elements", () => {
    const form = [1, 1];
    expect(areFormElementsUnique(form)).toBeFalsy();
  });

  test("Can check for duplicate in empty array", () => {
    const form: Form = [];
    expect(areFormElementsUnique(form)).toBeTruthy();
  });

  /// Form - 3 Serializable to text/json

  test("Can serialize form to test/json", () => {
    const form: Form = [1, 2, 3];
    const json = "[1,2,3]";

    expect(serialize(form)).toEqual(json);
  });

  test("Can parse text/json to Form", () => {
    const json = "[1,2,3]";
    const form: Form = [1, 2, 3];

    expect(parse(json).unwrap()).toEqual(form);
  });

  test("Can serialize and parse back to the same value", () => {
    const form: Form = [1, 2, 3];
    expect(parse(serialize(form)).unwrap()).toEqual(form);
  });

  /**
   * TODO: Find proper fuzzing set to ensure test coverage
   * Ideally we'd have good logs in jest here as well to show which one failed
   * It seems overly verbose for the point of the exercise
   */
  test("Can't parse invalid json", () => {
    const json = '[1, 2, 3, "a"]';
    expect(parse(json).unwrap).toThrow();

    const json1 = "[null, 2, 3]";
    expect(parse(json1).unwrap).toThrow();

    const json2 = "[[], 1, 2, 3]";
    expect(parse(json2).unwrap).toThrow();

    const json3 = "[{}, 1, 2, 3]";
    expect(parse(json3).unwrap).toThrow();

    const json4 = "{}";
    expect(parse(json4).unwrap).toThrow();

    const json5 = "5";
    expect(parse(json5).unwrap).toThrow();

    const json6 = "6";
    expect(parse(json6).unwrap).toThrow();
  });
});

describe("FormElement", () => {
  // FormElement  Value Type - Should by copyable, equatable, and immutable

  test("Can equate FormElements", () => {
    const formElementA: FormElement = 1;
    const formElementB: FormElement = 1;
    expect(areFormElementsEqual(formElementA, formElementB)).toBeTruthy();
  });

  test("Can't equate unequal FormElements", () => {
    const formElementA: FormElement = 1;
    const formElementB: FormElement = 2;
    expect(areFormElementsEqual(formElementA, formElementB)).toBeFalsy();
  });

  test("Can copy FormElement", () => {
    const formElement: FormElement = 1;
    expect(areFormElementsEqual(formElement, copy(formElement))).toBeTruthy();
  });

  test("Cannot reassign values to FormElement", () => {
    const formElement: FormElement = 1;

    expect(() => {
      // @ts-expect-error Should not be able to reassign values to our FormElement
      formElement = 2;
    }).toThrow();
  });

  test("Can serialize form element", () => {
    const formElement: FormElement = 1;
    expect(serializeFormElement(formElement)).toBe("1");
  });

  test("Can parse form element", () => {
    const formElement = "1";
    expect(parseFormElement(formElement).unwrap()).toBe(1);
  });

  test("Can't parse invalid form element", () => {
    const formElement = '"1"';
    expect(parseFormElement(formElement).unwrap).toThrow();
  });
});

describe("Result", () => {
  test("Can create ok", () => {
    const value = ok(0);
    expect(value.isError).toBeFalsy();
    expect(value.isOk).toBeTruthy();
    expect(value.unwrap()).toEqual(0);
    expect(value.unwrapError).toThrow();
    expect(value.map((innerValue) => ok(innerValue + 1)).unwrap()).toEqual(1);
  });

  test("Can create error", () => {
    const value = error("THIS IS AN ERROR");
    expect(value.isError).toBeTruthy();
    expect(value.isOk).toBeFalsy();
    expect(value.unwrap).toThrow();
    expect(value.unwrapError()).toEqual("THIS IS AN ERROR");
    expect(value.map(() => ok(0)).unwrap).toThrow();
  });

  test("Can chain results", () => {
    const step0 = result<number, "step0Error">(error("step0Error"));
    const step1 = step0.map((step0Value) =>
      result<number, "step1Error">(ok(step0Value + 1))
    );

    expect(step1.isError).toBeTruthy();
    expect(step0.isError).toBeTruthy();
    expect(step1.unwrapError()).toBe("step0Error");
  });
});
