import React, { useState } from "react";
import { randerItem } from "./renderItm";
import { Button, Modal, Form } from "react-bootstrap";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";

const Employee = () => {
  const [empdata, setEmpData] = useState([]);
  const [allEmpData, setAllEmpData] = useState([]);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");
  const [department, setDepartment] = useState("");
  const [empStatus, setEmpStatus] = useState("add");
  const [editIndex, setEditIndex] = useState("");
  const [viewData, setViewData] = useState({});
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [salaryFilter, setSalaryFilter] = useState("");

  const del = (event) => {
    let filterdata = [...empdata];
    filterdata.splice(event, 1);
    setEmpData(filterdata);
    setAllEmpData(filterdata);
  };

  const edit = (event) => {
    setShow(true);
    setName(event.item.name);
    setSalary(event.item.salary);
    setDepartment(event.item.department);
    setEmpStatus("edit");
    setEditIndex(event.index);
  };

  const view = (event) => {
    setShow(true);
    setViewData(event.item);
    setEmpStatus("view");
  };

  const editEmp = () => {
    if (name.length > 0 && salary.length > 0 && department.length > 0) {
      let updateData = empdata.map((item, idx) => {
        return idx === editIndex
          ? { ...item, name: name, salary: salary, department: department }
          : item;
      });

      setEmpData(updateData);
      setAllEmpData(updateData);
      handleClose();
    } else {
      alert("All fields is required. Please fill !!");
    }
  };

  const handleClose = () => {
    setShow(false);
    setName("");
    setSalary("");
    setDepartment("");
    setEmpStatus("add");
  };

  const addEmp = () => {
    if (name.length > 0 && salary.length > 0 && department.length > 0) {
      let empDataTemp = [...allEmpData];
      let newObj = {
        name: name,
        department: department,
        salary: salary,
      };
      empDataTemp = [newObj, ...empDataTemp];
      setEmpData(empDataTemp);
      setAllEmpData(empDataTemp);
      filterDataFun(empDataTemp);
      handleClose();
    } else {
      alert("All fields is required. Please fill !!");
    }
  };

  const filterDataFun = (allData) => {
    let depFilterData = [];
    if (departmentFilter === "backEnd" || departmentFilter === "frontEnd") {
      depFilterData = allData?.filter((val, idx) => {
        return departmentFilter === val?.department;
      });
    } else {
      depFilterData = allData;
    }

    let sortData = depFilterData.sort((a, b) => {
      if (salaryFilter === "lowest") {
        return a.salary - b.salary;
      } else if (salaryFilter === "highest") {
        return b.salary - a.salary;
      } else {
        return;
      }
    });

    if (salaryFilter === "lowest" || salaryFilter === "highest") {
      let sortSalery = sortData[0].salary;
      let finalRes = depFilterData?.filter((item, idx) => {
        return item?.salary === sortSalery;
      });
      setEmpData(finalRes);
    } else {
      setEmpData(depFilterData);
    }
  };

  const resetFilter = () => {
    setDepartmentFilter("");
    setSalaryFilter("");
    setEmpData(allEmpData);
  };

  return (
    <>
      <div className="Add-btn d-flex justify-content-end mb-5">
        <Button
          type="button"
          className="btn btn-primary"
          onClick={() => setShow(true)}
        >
          Add Employees
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{empStatus} Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {empStatus === "view" ? (
              <div className="viewEmp">
                <h4>Employee Name: {viewData.name}</h4>
                <h4>Employee Department: {viewData.department}</h4>
                <h4>Employee Salary: {viewData.salary}</h4>
              </div>
            ) : (
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Employee Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label> Employee Department </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) => {
                      setDepartment(e.target.value);
                    }}
                    value={department}
                  >
                    <option>Select Department</option>
                    <option value="frontEnd">Front End</option>
                    <option value="backEnd">Back End</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label> Employee Salary </Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Salary"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                  />
                </Form.Group>
              </Form>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {empStatus !== "view" && (
              <Button
                variant="primary"
                onClick={empStatus === "add" ? addEmp : editEmp}
              >
                {empStatus === "add" ? "Add" : "Edit"}
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </div>

      <div className="d-flex justify-content-between mb-4">
        <h4>Employees Data</h4>
        <div className="d-flex">
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => {
              setDepartmentFilter(e.target.value);
            }}
            value={departmentFilter}
          >
            <option>Select Department</option>
            <option value="frontEnd">Front End</option>
            <option value="backEnd">Back End</option>
          </Form.Select>
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => {
              setSalaryFilter(e.target.value);
            }}
            value={salaryFilter}
          >
            <option>Select Salary</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </Form.Select>
          <Button variant="primary" onClick={() => filterDataFun(allEmpData)}>
            Search
          </Button>
          <Button variant="primary" onClick={resetFilter}>
            Reset
          </Button>
        </div>
      </div>
      <table className="table table-bordered">
        <thead className="thead-dark text-center">
          <tr>
            <th scope="col">Employees Name</th>
            <th scope="col">Departments</th>
            <th scope="col">Salary</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {empdata?.length > 0 ? (
            empdata?.map((item, index) =>
              randerItem(item, index, del, edit, view)
            )
          ) : (
            <tr>
              <td colSpan={4}>
                <h4>Data Note Found...</h4>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};
export default Employee;
