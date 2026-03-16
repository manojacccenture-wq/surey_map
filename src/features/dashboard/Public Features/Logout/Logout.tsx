import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logoutAsync } from "@/features/auth/authThunk";
import { useAppDispatch } from "@/app/store/hook";

const Logout: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async (): Promise<void> => {
      try {
        await dispatch(logoutAsync()).unwrap();
      } catch (err) {
      } finally {
        navigate("/", { replace: true });
      }
    };

    performLogout();
  }, [dispatch, navigate]);

  return null;
};

export default Logout;