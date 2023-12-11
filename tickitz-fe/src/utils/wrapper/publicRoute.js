import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "components/Loader";

const publicRoute = (WrappedComponent) => {
  const Auth = (props) => {
    const data = useSelector((state) => state.auth.data);
    // console.log(data);
    const router = useRouter();

    if (data.token) {
      router.push("/");
    }
    if (!data.token) {
      return <WrappedComponent {...props} />;
    }
    return <Loader />;
  };

  return Auth;
};

export default publicRoute;
