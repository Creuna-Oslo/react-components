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
        options={[
          { label: "Apples", value: "apples" },
          { label: "Oranges", value: "oranges", selected: true },
          { label: "Bananas", value: "bananas" }
        ]}
      />
    </div>
  </Layout>
);

export default ModalPage;
