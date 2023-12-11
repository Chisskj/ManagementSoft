import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "components/Loader";

const privateRoute = (WrappedComponent) => {
  const Auth = (props) => {
    const data = useSelector((state) => state.auth.data.token);
    console.log(data);
    const router = useRouter();

    if (!data) {
      router.push("/login");
    }

    if (data) {
      return <WrappedComponent {...props} />;
    }
    return <Loader />;
  };

  return Auth;
};

export default privateRoute;
