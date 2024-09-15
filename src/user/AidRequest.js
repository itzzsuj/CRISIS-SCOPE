import React, { useState } from "react";
import { db } from "../firebase/firebase"; // Firebase setup
import { collection, addDoc } from "firebase/firestore"; // Firestore utilities
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing

const AidRequest = () => {
  const [details, setDetails] = useState("");
  const [location, setLocation] = useState("");
  const [urgency, setUrgency] = useState("");
  const [aidType, setAidType] = useState(""); // Type of Aid (e.g., Medical, Shelter, etc.)
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Add the aid request to the Firestore collection
      await addDoc(collection(db, "AidRequests"), {
        details,
        location,
        urgency,
        aidType,
        timestamp: new Date(),
      });

      // Show success message
      alert("Aid request submitted successfully.");
      
      // Clear the form
      setDetails("");
      setLocation("");
      setUrgency("");
      setAidType("");

      // Navigate to the UserDashboard
      navigate("/UserDashboard");

    } catch (error) {
      console.error("Error submitting request: ", error);
      alert("Failed to submit the request.");
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-6 mt-24">
      <h1 className="text-3xl font-bold text-center mb-6">Submit an Aid Request</h1>
      <p className="text-center mb-8 text-xl">
        Need medical supplies, hygiene kits, or shelter materials? Submit your aid request below.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
        <div>
          <label className="block text-lg font-medium text-gray-700">Request Details</label>
          <textarea
            className="w-full mt-2 p-3 border border-gray-300 rounded-md"
            placeholder="Describe your aid request"
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
        <div>
          <label className="block text-lg font-medium text-gray-700">Type of Aid</label>
          <select
            className="w-full mt-2 p-3 border border-gray-300 rounded-md"
            value={aidType}
            onChange={(e) => setAidType(e.target.value)}
            required
          >
            <option value="">Select Aid Type</option>
            <option value="Medical">Medical Supplies</option>
            <option value="Shelter">Shelter</option>
            <option value="Hygiene">Hygiene Kits</option>
            <option value="Food">Food Supplies</option>
            <option value="Other">Other</option>
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
    </div>
  );
};

export default AidRequest;
