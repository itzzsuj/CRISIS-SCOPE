import React, { useState } from "react";
import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router

const FoodRequest = () => {
  const [details, setDetails] = useState("");
  const [location, setLocation] = useState("");
  const [urgency, setUrgency] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); // New state for phone number
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Add the form data, including phone number, to Firestore
      await addDoc(collection(db, "FoodRequests"), {
        details,
        location,
        urgency,
        phoneNumber, // Include phone number in Firestore
        timestamp: new Date(),
      });

      // Display success message
      alert("Food request submitted successfully.");

      // Clear the form inputs
      setDetails("");
      setLocation("");
      setUrgency("");
      setPhoneNumber(""); // Clear phone number input

      // Navigate to the UserDashboard after successful form submission
      navigate("/UserDashboard");

    } catch (error) {
      console.error("Error submitting request: ", error);
      alert("Failed to submit the request.");
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-6 mt-24">
      <h1 className="text-3xl font-bold text-center mb-6">Submit a Food Request</h1>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
        <div>
          <label className="block text-lg font-medium text-gray-700">Request Details</label>
          <textarea
            className="w-full mt-2 p-3 border border-gray-300 rounded-md"
            placeholder="Describe your food request"
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
          <label className="block text-lg font-medium text-gray-700">Urgency</label>
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
          <label className="block text-lg font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            className="w-full mt-2 p-3 border border-gray-300 rounded-md"
            placeholder="Enter your phone number"
            pattern="[0-9]{10}" // Ensures only a 10-digit phone number is entered
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
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

export default FoodRequest;
