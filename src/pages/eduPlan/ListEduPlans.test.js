import React from "react";
import renderer from "react-test-renderer";
import AppStructure from "../../components/structure/AppStructure";

import ListEduPlans from "./ListEduPlans";

describe("testing component", () => {
  it("should run in test env", () => {
    expect(process.env.NODE_ENV).toEqual("test");
  });

  it("a test for the test", () => {
    return undefined;
  });
});
