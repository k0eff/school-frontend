import React from "react";
import renderer from "react-test-renderer";
import AppStructure from "../../components/structure/AppStructure";

import ListEduPlans from "./ListEduPlans";
import TableData from "../../components/TableData/tableData";
import Menu from "../../components/menu/menu";

describe("testing component", () => {
  it("should run in test env", () => {
    expect(process.env.NODE_ENV).toEqual("test");
  });

  let rend, inst;

  beforeEach(() => {
    rend = renderer.create(
      <AppStructure>
        <ListEduPlans />
      </AppStructure>
    );
    inst = rend.root;
  });

  afterEach(() => {
    rend.unmount();
    rend = null;
  });

  it("shows TableNav ", () => {
    expect(
      inst.findByProps({
        className: "dataTables_info",
        id: "dataTable_info",
        role: "status"
      })
    ).toBeDefined();
  });

  it("shows TableData", () => {
    expect(inst.findByType(TableData)).toBeDefined();
  });

  it("shows table tag", () => {
    expect(
      inst.findByProps({ className: "table table-bordered dataTable" })
    ).toBeDefined();
  });

  it("shows loading animation", () => {
    expect(inst.findByType("img")).toBeDefined();
  });

  it("has only 1 left menu", () => {
    expect(inst.findAllByType(Menu).length).toBe(1);
  });
});
