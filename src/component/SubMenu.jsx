import { Box, Paper, Typography, Link, Button } from "@material-ui/core";
import React from "react";
import { FaAngleRight } from "react-icons/fa";
import { Link as DomRouterLink } from "react-router-dom";

export default function SubMenuWithLink({ Icon, title, desc, routerLink }) {
  return (
    <Link
      to={routerLink}
      style={{ textDecoration: "none" }}
      component={DomRouterLink}
    >
      <Paper variant="outlined" style={{ minHeight: 50 }}>
        <Box display="flex" style={{ minHeight: 50 }}>
          <Box display="flex" alignItems="center" style={{ margin: "10px" }}>
            <Icon size={30} color="#00e0b0" />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="center"
            ml={2}
            style={{ minHeight: 50 }}
          >
            <Typography variant="h6">{title}</Typography>
            {desc && <Typography variant="caption">{desc}</Typography>}
          </Box>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-end"
            justifyContent="center"
            style={{ minHeight: 50, width: "100%", color: "#fff" }}
            pr={5}
          >
            <FaAngleRight />
          </Box>
        </Box>
      </Paper>
    </Link>
  );
}

export function SubMenu({ Icon, title, desc, onclick }) {
  return (
    <Button
      fullWidth
      variant="text"
      style={{ textDecoration: "none", padding: 0 }}
      onClick={() => onclick()}
    >
      <Paper variant="outlined" style={{ minHeight: 50, width: "100%" }}>
        <Box display="flex" style={{ minHeight: 50 }}>
          <Box display="flex" alignItems="center">
            <Icon size={30} color="#00e0b0" />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="center"
            ml={2}
            style={{ minHeight: 50 }}
          >
            <Typography variant="h6">{title}</Typography>
            {desc && <Typography variant="caption">{desc}</Typography>}
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-end"
            justifyContent="center"
            style={{ minHeight: 50, width: "100%" }}
            pr={5}
          >
            <FaAngleRight />
          </Box>
        </Box>
      </Paper>
    </Button>
  );
}
