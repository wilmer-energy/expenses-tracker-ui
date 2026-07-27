import { useNavigate } from "react-router";
import { toast } from "sonner";
import { authApi } from "../api";
import { clearAccessToken } from "@/modules/shared/lib/auth-storage";
import { useAppDispatch } from "@/store/hooks";

export function useLogout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return () => {
    clearAccessToken();
    dispatch(authApi.util.resetApiState());
    toast.success("Sesión cerrada correctamente");
    navigate("/signin", { replace: true });
  };
}
