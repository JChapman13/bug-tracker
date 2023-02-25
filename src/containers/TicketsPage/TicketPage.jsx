import React from "react";
import TopBar from "../../components/TopBar/TopBar";
import Tickets from "../../components/Tickets/Tickets";
import { Grid } from "@mui/material";

function TicketPage() {
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
          <Tickets />
        </Grid>
      </Grid>
    </div>
  );
}

export default TicketPage;
