import { useUser } from "../contexts/UserContext";
import { signOut } from "../lib/firebase";
import { useNavigate } from "react-router-dom";

export const AccountSettings = ({ userData }: { userData: any }) => {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(); // calls Firebase signOut
      setUser(null);   // clear context
      navigate("/signin"); // redirect
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Account Settings</h2>
      <div className="p-4 bg-green-50 rounded-lg">
        <p className="mb-2 text-muted-foreground">
          Signed in as <strong>{userData.email}</strong>
        </p>
        <button
          onClick={handleSignOut}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};
