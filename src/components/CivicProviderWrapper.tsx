// //@ts-nocheck
// import { useNavigate } from "react-router-dom";
// import { CivicAuthProvider } from "@civic/auth-web3/react";
// import { toast } from "react-toastify";
// import { useRef } from "react";

// const CivicProviderWrapper = ({ children }: any) => {
//   const navigate = useNavigate();
//   const hasSignedIn = useRef(false); // flag to prevent multiple calls

//   const handleSignIn = (error?: Error) => {
//     if (hasSignedIn.current) return;
//     hasSignedIn.current = true;

//     if (error) {
//       console.error("Sign-in error:", error);
//       toast.error("Sign-in failed");
//     } else {
//       toast.success("Successfully signed in!");
//       navigate("/dashboard");
//     }
//   };

//   return (
//     <CivicAuthProvider
//       clientId="012343bd-4e27-43ea-9a4e-0a3bd0ad897b"
//       onSignIn={handleSignIn}
//       // Configure for devnet to match your RPC endpoint
//       config={{
//         solana: {
//           network: "devnet",
//         },
//       }}
//     >
//       {children}
//     </CivicAuthProvider>
//   );
// };

// export default CivicProviderWrapper;
//@ts-nocheck
import { useNavigate, useLocation } from "react-router-dom";
import { CivicAuthProvider } from "@civic/auth-web3/react";
import { toast } from "react-toastify";
import { useRef } from "react";

const CivicProviderWrapper = ({ children }: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const hasSignedIn = useRef(false); // flag to prevent multiple calls

  const handleSignIn = (error?: Error) => {
    if (hasSignedIn.current) return;
    hasSignedIn.current = true;

    if (error) {
      console.error("Sign-in error:", error);
      toast.error("Sign-in failed");
    } else {
      toast.success("Successfully signed in, please wait...");

      // Check if user is on a shared event page
      const isSharedEventPage = location.pathname.startsWith("/event/");

      if (isSharedEventPage) {
        // Stay on the event page, don't redirect
        console.log(
          "User signed in on shared event page, staying on current page"
        );
      } else {
        // Regular sign-in flow - redirect to dashboard
        navigate("/dashboard");
      }
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
