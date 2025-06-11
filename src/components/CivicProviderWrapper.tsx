//@ts-nocheck
import { useNavigate } from "react-router-dom";
import { CivicAuthProvider } from "@civic/auth-web3/react";
import { toast } from "react-toastify";
import { useRef } from "react";

const CivicProviderWrapper = ({ children }: any) => {
  const navigate = useNavigate();
  const hasSignedIn = useRef(false); // flag to prevent multiple calls

  const handleSignIn = (error?: Error) => {
    if (hasSignedIn.current) return;
    hasSignedIn.current = true;

    if (error) {
      console.error("Sign-in error:", error);
      toast.error("Sign-in failed");
    } else {
      toast.success("Successfully signed in!");
      navigate("/dashboard");
    }
  };

  return (
    <CivicAuthProvider
      clientId="012343bd-4e27-43ea-9a4e-0a3bd0ad897b"
      onSignIn={handleSignIn}
      // Configure for devnet to match your RPC endpoint
      config={{
        solana: {
          network: "devnet",
        },
      }}
    >
      {children}
    </CivicAuthProvider>
  );
};

export default CivicProviderWrapper;
