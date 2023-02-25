import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Paper } from "@mui/material";

const priorities = ["Low", "Medium", "High"];
const types = ["Bug", "Feature Request", "Improvement", "Task"];
const statuses = ["Open", "In Progress", "Resolved", "Closed"];

function CreateTicket({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState(null);
  const [reporter, setReporter] = useState("");
  const [priority, setPriority] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [labels, setLabels] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [comments, setComments] = useState("");
  const [attachments, setAttachments] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      title,
      description,
      assignee,
      reporter,
      priority,
      type,
      status,
      labels,
      dueDate,
      comments,
      attachments,
    });
    setTitle("");
    setDescription("");
    setAssignee(null);
    setReporter("");
    setPriority("");
    setType("");
    setStatus("");
    setLabels("");
    setDueDate("");
    setComments("");
    setAttachments([]);
  };

  return (
    <div className="ticket-page-wrapper">
      <Paper>
        <TextField
          label="Title/Summary"
          variant="outlined"
          fullWidth
          required
          value={title}
          onChange={(event) => setTitle(event.target.value)}
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
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <br />
        <br />
        <Autocomplete
          options={["John", "Mary", "Tom"]}
          value={assignee}
          onChange={(event, newValue) => {
            setAssignee(newValue);
          }}
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
          value={reporter}
          onChange={(event) => setReporter(event.target.value)}
        />
        <br />
        <br />
        <FormControl variant="outlined" fullWidth required>
          <InputLabel id="priority-label">Priority</InputLabel>
          <Select
            labelId="priority-label"
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
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
            value={type}
            onChange={(event) => setType(event.target.value)}
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
            value={status}
            onChange={(event) => setStatus(event.target.value)}
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
          label="Labels"
          variant="outlined"
          fullWidth
          value={labels}
          onChange={(event) => setLabels(event.target.value)}
        />
        <br />
        <br />
        <TextField
          label="Due Date"
          variant="outlined"
          fullWidth
          type="date"
          InputLabelProps={{ shrink: true }}
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
        />
        <br />
        <br />
        <TextField
          label="Comments"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={comments}
          onChange={(event) => setComments(event.target.value)}
        />
        <br />
        <br />
        <Button variant="contained" component="label">
          Upload Attachment
          <input
            type="file"
            hidden
            multiple
            onChange={(event) => setAttachments(event.target.files)}
          />
        </Button>
        <br />
        <br />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Paper>
    </div>
  );
}

export default CreateTicket;
