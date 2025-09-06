"use client";

import { useForm } from "react-hook-form";
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import { useExpenses } from "@/context/ExpensesContext";
import { useRouter } from "next/navigation";

type Expense = { name: string; price: number };

type FormValues = {
  name: string;
  price: number | undefined;
};

export default function CreateExpense() {
  const { addExpense } = useExpenses();
  const rourte = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: { name: "", price: undefined },
  });

  const onSubmit = (data: FormValues) => {
    if (data.price === undefined) return;

    const NewExpense: Expense = {
      name: data.name,
      price: data.price,
    };

    addExpense(NewExpense);
    rourte.push("/");
    reset();
  };

  return (
    <Box
      component="section"
      sx={{
        height: "calc(100vh - 48px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 3,
          maxWidth: 480,
          width: "100%",
        }}
        variant="outlined"
      >
        <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
          Create Expense
        </Typography>

        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: "grid", gap: 2 }}
        >
          {/* Expense */}
          <TextField
            color="primary"
            size="medium"
            label="Expense"
            placeholder="Example: Food, Car, Gym"
            fullWidth
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register("name", {
              required: "Name is required",
              minLength: { value: 3, message: "At least 3 characters" },
            })}
          />

          {/* Price */}
          <TextField
            label="Price"
            size="medium"
            placeholder="0.00"
            type="number"
            fullWidth
            error={!!errors.price}
            helperText={errors.price?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            {...register("price", {
              required: "Price is required",
              min: { value: 0.01, message: "Must be greater than 0" },
              setValueAs: (v) =>
                v === "" || v === null ? undefined : parseFloat(v),
              valueAsNumber: true,
            })}
          />

          {/* Actions */}
          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
            <Tooltip title="Create Expense">
              <Button
                type="submit"
                loading={isSubmitting}
                variant="contained"
                loadingPosition="start"
              >
                Create
              </Button>
            </Tooltip>

            <Tooltip title="Clear">
              <Button variant="outlined" type="button" onClick={() => reset()}>
                Clear
              </Button>
            </Tooltip>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
