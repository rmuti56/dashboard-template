import { login } from "@/apis/login.api";
import useConfirm from "@/hooks/useConfirm";
import { LoginForm } from "@/types/login.type";
import { LockOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { homePageUrl } from "../home";

const LoginPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginForm>();
  const { confirmError } = useConfirm();
  const navigate = useNavigate();
  const { isLoading, mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: () => {
      navigate(homePageUrl);
    },
    onError: () => {
      confirmError({
        title: "Login failure",
        message: "User name or password incorrect, please try again",
      });
    },
  });

  const onSubmit = (loginForm: LoginForm) => {
    mutate(loginForm);
  };

  return (
    <Box
      sx={{
        background: (theme) => theme.palette.background.main,
        height: "100vh",
      }}
    >
      <Container>
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            sx={{ mt: 1 }}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              autoComplete="username"
              autoFocus
              {...register("username", {
                required: "this field is require",
              })}
              error={!!errors.username}
              helperText={errors.username?.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password", {
                required: "this field is require",
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={20} /> : "Login"}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;
