import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebase"; // Ensure Firestore (db) and auth are correctly imported
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"; // Firebase authentication
import { collection, query, where, getDocs, addDoc } from "firebase/firestore"; // Firestore utilities, including addDoc

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usertype, setUsertype] = useState("");
  const [isRegister, setIsRegister] = useState(false); // Determine whether user is registering

  // Login or Register function based on isRegister state
  const signInOrRegister = async (e) => {
    e.preventDefault();

    if (!usertype || !email || !password) {
      alert("Please fill all required fields");
      return;
    }

    if (isRegister && (usertype === "User" || usertype === "Rescue Team" || usertype === "Admin")) {
      // Register flow for User, Rescue Team, or Admin
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        alert("Registration successful");

        // Save additional user data in Firestore based on usertype
        await addUserDataToFirestore(userCredential.user.uid, email, usertype);

        navigate("/"); // Redirect to home or dashboard
      } catch (error) {
        alert(`Registration failed: ${error.message}`);
      }
    } else {
      // Login flow
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful");

        // Fetch user data from Firestore based on user type
        const q = query(
          collection(db, usertype === "Admin" ? "Admins" : usertype === "User" ? "Users" : "RescueTeam"),
          where("email", "==", email)
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          alert("User does not exist");
        } else {
          querySnapshot.forEach((doc) => {
            const userData = doc.data();
            console.log("User data:", userData);
            localStorage.setItem("userType", usertype); // Save user type locally
          });

          // Navigate based on user type
          switch (usertype) {
            case "Admin":
              navigate("/AdminDashboard");
              break;
            case "User":
              navigate("/UserDashboard");
              break;
            case "Rescue Team":
              navigate("/RescueDashboard");
              break;
            default:
              navigate("/");
          }
        }
      } catch (error) {
        alert(`Login failed: ${error.message}`);
      }
    }
  };

  // Function to add user data to Firestore upon registration
  const addUserDataToFirestore = async (uid, email, usertype) => {
    try {
      const userDocRef = collection(db, usertype === "Admin" ? "Admins" : usertype === "User" ? "Users" : "RescueTeam");
      await addDoc(userDocRef, {
        uid: uid,
        email: email,
        userType: usertype,
      });
      console.log("User added to Firestore");
    } catch (error) {
      console.error("Error adding user to Firestore:", error);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">{isRegister ? "Register" : "Login"}</h2>
        <form onSubmit={signInOrRegister} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">User Type</label>
            <select
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              value={usertype}
              onChange={(e) => setUsertype(e.target.value)}
              required
            >
              <option value="">Select User Type</option>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
              <option value="Rescue Team">Rescue Team</option>
            </select>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
            >
              {isRegister ? "Register" : "Sign in"}
            </button>
          </div>
        </form>
        {(usertype === "User" || usertype === "Rescue Team" || usertype === "Admin") && (
          <div className="flex justify-center mt-4">
            <button
              className="text-blue-500 underline"
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Login;
