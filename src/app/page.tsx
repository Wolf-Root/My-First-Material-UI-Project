"use client";

import {
  Box,
  Paper,
  Typography,
  IconButton,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useExpenses } from "@/context/ExpensesContext";

export default function Home() {
  const { expenses, removeExpense, isLoading } = useExpenses();

  return isLoading ? (
    <Box
      sx={{
        height: "calc(100vh - 48px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  ) : (
    <Box
      component="section"
      sx={{
        height: "calc(100vh - 48px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {expenses.length ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {expenses.map(({ name, price }, index) => (
            <Paper
              key={index}
              variant="outlined"
              sx={{
                width: { xs: 300, sm: 400 },
                display: "flex",
                flexDirection: "column",
                alignItems: "end",
                overflow: "hidden",
              }}
            >
              {/* Remove Icon */}
              <Tooltip title="Remove This Expense" placement="top">
                <IconButton
                  size="small"
                  sx={{
                    py: 1,
                  }}
                  aria-label="Remove"
                  onClick={() => removeExpense(name)}
                >
                  <CloseIcon />
                </IconButton>
              </Tooltip>

              {/* Expenses Details */}
              <Box
                sx={{
                  width: "100%",
                  py: 1,
                  px: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  textTransform: "capitalize",
                  gap: 1,
                }}
              >
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{
                    fontWeight: "700",
                    textWrap: "wrap",
                  }}
                >
                  {name}
                </Typography>
                <Typography
                  variant="h5"
                  component="h2"
                  color="textDisabled"
                  sx={{ fontWeight: "700" }}
                >
                  ${price}
                </Typography>
              </Box>
            </Paper>
          ))}

          <Typography
            variant="h5"
            component="h2"
            color="initial"
            sx={{ fontWeight: "700", textAlign: "center" }}
          >
            👉 You Spend ${expenses.reduce((sum, item) => sum + item.price, 0)}
          </Typography>
        </Box>
      ) : (
        <Typography
          variant="h1"
          component="h2"
          color="initial"
          sx={{ textTransform: "capitalize" }}
        >
          You don&apos;t have any expenses
        </Typography>
      )}
    </Box>
  );
}
