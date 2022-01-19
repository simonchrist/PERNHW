import React, { Fragment, useEffect, useState } from "react";

import EditHW from "./EditHW";

const ListHW = () => {
  const [hw, setHW] = useState([]);

  //delete hw function

  const deleteHW = async id => {
    try {
      const deleteHW = await fetch(`http://localhost:5000/hw/${id}`, {
        method: "DELETE"
      });

      setHW(hw.filter(hw => hw.hw_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const getHW = async () => {
    try {
      const response = await fetch("http://localhost:5000/hw");
      const jsonData = await response.json();

      setHW(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getHW();
  }, []);

  console.log(hw);

  return (
    <Fragment>
      {" "}
      <table class="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/*<tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
          </tr> */}
          {hw.map(hw => (
            <tr key={hw.hw_id}>
              <td>{hw.description}</td>
              <td>
                <EditHW hw={hw} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteHW(hw.hw_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListHW;