"use client";
import { signIn, useSession } from "next-auth/react";
import styles from "./loginPage.module.css";
import useParentPath from "@/hooks/useParentPath";
import { useRouter} from "next/navigation";
const Login = () => {
  const { status,data } = useSession();

  const parentPath = useParentPath();
  const router = useRouter();

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (status === "authenticated") {
    // router.push(parentPath||"/"+data.user.name)
    router.back()
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.socialButton} onClick={(e) => 
        { e.preventDefault()
          signIn("google")}}>
          Sign in with Google
        </div>  
      </div>
    </div>
  );
};

export default Login;