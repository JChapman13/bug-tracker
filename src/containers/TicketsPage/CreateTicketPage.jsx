import React, { useState } from "react";
import TopBar from "../../components/TopBar/TopBar";
import { Grid } from "@mui/material";
import CreateTicket from "../../components/Tickets/CreateTicket";
import "./ticketpage.css";

const priorities = ["Low", "Medium", "High"];

function CreateTicketPage() {
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState(null);
  const [priority, setPriority] = useState("");

  return (
    <div className="ticket-page-wrapper">
      <Grid container spacing={2} direction="column">
        <Grid item xs={12} sm={6}>
          <TopBar
            pageName="Tickets"
            mainLink={"/tickets"}
            createLinkName={"Create A Ticket"}
            mainLinkName={"Tickets"}
            createLink={"/tickets/create"}
          />
          <CreateTicket />
        </Grid>
      </Grid>
    </div>
  );
}

export default CreateTicketPage;
