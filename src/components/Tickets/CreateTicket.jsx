import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const priorities = ["Low", "Medium", "High"];
const types = ["Bug", "Feature Request", "Improvement", "Task"];
const statuses = ["Open", "In Progress", "Resolved", "Closed"];

function CreateTicket({ onSubmit }) {
  const [values, setValues] = useState({
    title: "",
    description: "",
    assignee: null,
    reporter: "",
    priority: "",
    type: "",
    status: "",
    dueDate: "",
    comments: "",
    attachments: [],
  });
  const [employeeList, setEmployeeList] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    getEmployees();
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    let value = event.target.value;

    if (name === "attachments") {
      value = Array.from(event.target.files);
    }

    setValues({
      ...values,
      [name]: value,
    });
  };

  const getEmployees = async (e) => {
    fetch("/api/employees").then((res) =>
      res.json().then((token) => {
        let employeeTeamList = [];
        let result = JSON.parse(atob(token.split(".")[1])).employees;
        let empList = result.sort((a, b) =>
          a.firstName.localeCompare(b.firstName)
        );
        employeeTeamList = empList;
        setEmployeeList(empList);
      })
    );
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/tickets-create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      navigate("/tickets");
    } catch (error) {
      console.error(error);
    }
  };

  if (!employeeList) {
    <h1>Loading</h1>;
  }
  return (
    <div className="ticket-page-wrapper">
      <Paper sx={{ padding: "2rem" }}>
        <TextField
          label="Title/Summary"
          variant="outlined"
          fullWidth
          required
          name="title"
          value={values.title}
          onChange={handleChange}
        />
        <br />
        <br />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          required
          multiline
          rows={4}
          name="description"
          value={values.description}
          onChange={handleChange}
        />
        <br />
        <br />
        <Autocomplete
          options={["John", "Mary", "Tom"]}
          value={values.assignee}
          onChange={(event, newValue) =>
            setValues({ ...values, assignee: newValue })
          }
          renderInput={(params) => (
            <TextField {...params} label="Assignee" variant="outlined" />
          )}
        />
        <br />
        <br />
        <TextField
          label="Reporter"
          variant="outlined"
          fullWidth
          required
          name="reporter"
          value={values.reporter}
          onChange={handleChange}
        />
        <br />
        <br />
        <FormControl variant="outlined" fullWidth required>
          <InputLabel id="priority-label">Priority</InputLabel>
          <Select
            labelId="priority-label"
            value={values.priority}
            onChange={handleChange}
            name="priority"
            label="Priority"
          >
            {priorities.map((priority) => (
              <MenuItem key={priority} value={priority}>
                {priority}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <br />
        <FormControl variant="outlined" fullWidth required>
          <InputLabel id="type-label">Type</InputLabel>
          <Select
            labelId="type-label"
            value={values.type}
            onChange={handleChange}
            name="type"
            label="Type"
          >
            {types.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <br />
        <FormControl variant="outlined" fullWidth required>
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            name="status"
            value={values.status}
            onChange={handleChange}
            label="Status"
          >
            {statuses.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <br />
        <TextField
          label="Due Date"
          variant="outlined"
          fullWidth
          type="date"
          name="dueDate"
          InputLabelProps={{ shrink: true }}
          onChange={handleChange}
        />
        <br />
        <br />
        <TextField
          label="Comments"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          name="comments"
          onChange={handleChange}
        />
        <br />
        <br />
        <Button variant="contained" component="label">
          Upload Attachment
          <input type="file" hidden multiple onChange={handleChange} />
        </Button>
        <br />
        <br />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Paper>
    </div>
  );
}

export default CreateTicket;
