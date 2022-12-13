import React, { memo } from "react";

import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

const DummyCardComponent: React.FC = () => {
  return (
    <Card sx={{ display: "inline-block", p: "1rem" }}>
      <header>
        <Typography variant="caption">header</Typography>
      </header>
      <Button variant="contained">login</Button>
    </Card>
  );
};

const DummyCard = memo(DummyCardComponent);
export default DummyCard;
