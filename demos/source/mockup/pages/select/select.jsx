// Select
import React from "react";
import Layout from "../../layout";

import Select from "components/select";
require("components/select/select.scss");

const ModalPage = () => (
  <Layout>
    <div>
      <Select
        id="select"
        name="select"
        placeholder="Select a value"
        options={[
          { label: "Apples", value: "apples" },
          { label: "Oranges", value: "oranges" },
          { label: "Bananas", value: "bananas" }
        ]}
      />
    </div>
  </Layout>
);

export default ModalPage;
