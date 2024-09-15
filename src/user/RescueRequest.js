import React, { useState } from "react";
import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const RescueRequest = () => {
  const [details, setDetails] = useState("");
  const [location, setLocation] = useState("");
  const [urgency, setUrgency] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "RescueRequests"), {
        details,
        location,
        urgency,
        numberOfPeople,
        timestamp: new Date(),
      });

      alert("Rescue request submitted successfully.");
      // Clear the form
      setDetails("");
      setLocation("");
      setUrgency("");
      setNumberOfPeople("");

      // Navigate to UserDashboard after form submission
      navigate("/UserDashboard");
    } catch (error) {
      console.error("Error submitting request: ", error);
      alert("Failed to submit the request.");
    }

    setLoading(false);
  };

  // Handle Logout and navigate to UserDashboard
  const handleLogout = () => {
    // Navigate to UserDashboard on logout
    navigate("/UserDashboard"); 
  };

  return (
    <div className="container mx-auto px-4 py-6 mt-24">
      <h1 className="text-3xl font-bold text-center mb-6">Submit a Rescue Request</h1>
      <p className="text-center mb-8 text-xl">
        If someone is in immediate danger or trapped, submit a rescue request here.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
        <div>
          <label className="block text-lg font-medium text-gray-700">Rescue Details</label>
          <textarea
            className="w-full mt-2 p-3 border border-gray-300 rounded-md"
            placeholder="Describe the nature of the emergency"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700">Location</label>
          <input
            type="text"
            className="w-full mt-2 p-3 border border-gray-300 rounded-md"
            placeholder="Enter your location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700">Number of People</label>
          <input
            type="number"
            className="w-full mt-2 p-3 border border-gray-300 rounded-md"
            placeholder="Number of people in need of rescue"
            value={numberOfPeople}
            onChange={(e) => setNumberOfPeople(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700">Urgency Level</label>
          <select
            className="w-full mt-2 p-3 border border-gray-300 rounded-md"
            value={urgency}
            onChange={(e) => setUrgency(e.target.value)}
            required
          >
            <option value="">Select Urgency Level</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </div>
        <button
          type="submit"
          className={`w-full py-3 px-6 bg-blue-600 text-white rounded-md font-bold hover:bg-blue-700 transition duration-300 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </form>

      {/* Logout Button */}
      <div className="mt-8 text-center">
        <button
          onClick={handleLogout}
          className="py-2 px-4 bg-red-600 text-white rounded-md font-bold hover:bg-red-700 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default RescueRequest;
