import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase"; // Import Firestore setup
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore"; // Firestore utilities
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"; // Leaflet map components
import one from "../images/CS.jpeg"; // Company logo
import foodRequestImage from "../images/foodRequests.jpeg"; // Food Request image
import aidRequestImage from "../images/aidRequests.jpeg"; // Aid Request image
import rescueImage from "../images/rescue.jpeg"; // Rescue Request image
import "leaflet/dist/leaflet.css"; // Import leaflet styles

function RescueDashboard() {
  const [foodRequests, setFoodRequests] = useState([]);
  const [aidRequests, setAidRequests] = useState([]);
  const [rescueRequests, setRescueRequests] = useState([]);
  const [sosRequests, setSOSRequests] = useState([]);
  const [predictedLocation, setPredictedLocation] = useState(null); // Store predicted location
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation

  // Fetch the Requests from Firebase
  useEffect(() => {
    const fetchRequests = async () => {
      // Fetch and sort Food Requests by urgency
      const foodSnapshot = await getDocs(collection(db, "FoodRequests"));
      const sortedFoodRequests = foodSnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .sort((a, b) => {
          const urgencyLevels = { Critical: 1, High: 2, Medium: 3, Low: 4 };
          return urgencyLevels[a.urgency] - urgencyLevels[b.urgency];
        });

      // Fetch Aid Requests
      const aidSnapshot = await getDocs(collection(db, "AidRequests"));
      const sortedAidRequests = aidSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Fetch Rescue Requests
      const rescueSnapshot = await getDocs(collection(db, "RescueRequests"));
      const sortedRescueRequests = rescueSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Fetch SOS Requests
      const sosSnapshot = await getDocs(collection(db, "SOSRequests"));
      const fetchedSOSRequests = sosSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setFoodRequests(sortedFoodRequests);
      setAidRequests(sortedAidRequests);
      setRescueRequests(sortedRescueRequests);
      setSOSRequests(fetchedSOSRequests);
    };

    fetchRequests();
  }, []);

  // Handle deleting the request
  const handleDelete = async (id, collectionName) => {
    try {
      await deleteDoc(doc(db, collectionName, id));
      // Update the state after deleting the request
      if (collectionName === "FoodRequests") {
        setFoodRequests((prevRequests) =>
          prevRequests.filter((request) => request.id !== id)
        );
      } else if (collectionName === "AidRequests") {
        setAidRequests((prevRequests) =>
          prevRequests.filter((request) => request.id !== id)
        );
      } else if (collectionName === "RescueRequests") {
        setRescueRequests((prevRequests) =>
          prevRequests.filter((request) => request.id !== id)
        );
      }
      alert("Request deleted successfully.");
    } catch (error) {
      console.error("Error deleting request: ", error);
      alert("Failed to delete the request.");
    }
  };

  // Fetch predicted location for SOS (replace userId with actual field or ID from SOSRequest)
  const predictLocation = async (userId) => {
    try {
      const doc = await db.collection("locations").doc(userId).get();
      if (doc.exists) {
        const data = doc.data();
        const latitude = data.latitude;
        const longitude = data.longitude;
        setPredictedLocation({ latitude, longitude });
      } else {
        alert("No location found for this user.");
      }
    } catch (error) {
      console.error("Error predicting location: ", error);
    }
  };

  const handleLogout = () => {
    // Perform any necessary cleanup
    navigate("/", { replace: true });
  };

  // Get background color based on urgency
  const getCardColor = (urgency) => {
    switch (urgency) {
      case "Critical":
        return "bg-red-100"; // Light Red
      case "High":
        return "bg-yellow-100"; // Light Yellow
      case "Medium":
        return "bg-blue-100"; // Light Blue
      default:
        return "bg-white"; // Default white
    }
  };

  return (
    <>
      {/* Header Section */}
      <header className="flex items-center justify-between w-full text-xl font-medium text-black bg-white shadow-lg fixed top-0 left-0 px-4 py-2 z-10">
        <div className="flex items-center">
          <img
            loading="lazy"
            src={one}
            alt="Company logo"
            className="object-contain w-40 max-w-full aspect-[3.5]"
          />
        </div>
        <nav className="flex items-center gap-4">
          <a href="#food" className="hover:underline">
            Food Requests
          </a>
          <a href="#aid" className="hover:underline">
            Aid Requests
          </a>
          <a href="#rescue" className="hover:underline">
            Rescue Requests
          </a>
          <a href="#sos" className="hover:underline">
            SOS Requests
          </a>
          <button
            onClick={handleLogout}
            className="px-4 py-1.5 whitespace-nowrap bg-yellow-400 rounded-full"
          >
            Logout
          </button>
        </nav>
      </header>

      {/* Main Content Section */}
      <main className="pt-24 px-4 mx-auto max-w-7xl">
        <section className="mt-12">
          {/* Food Request Section */}
          <div className="mb-12" id="food">
            <h2 className="text-4xl font-bold">Food Requests</h2>
            <p className="mt-4 text-xl">
              Below are the pending food requests. You can mark a request as completed by checking the box.
            </p>
          </div>

          {/* Display Food Request Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {foodRequests.length > 0 ? (
              foodRequests.map((request) => (
                <div
                  key={request.id}
                  className={`p-6 border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out ${getCardColor(
                    request.urgency
                  )}`}
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={foodRequestImage}
                      alt="Food Request"
                      className="w-16 h-16 object-cover mr-4 rounded-full"
                    />
                    <h3 className="text-2xl font-bold">Request Details</h3>
                  </div>

                  <p className="mb-4">{request.details}</p>
                  <p className="text-gray-700 mb-2">
                    <strong>Location:</strong> {request.location}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Phone Number:</strong> {request.phoneNumber || "N/A"}
                  </p>
                  <p className="text-gray-700 mb-4">
                    <strong>Urgency Level:</strong> {request.urgency}
                  </p>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      onChange={() => handleDelete(request.id, "FoodRequests")}
                    />
                    <label>Mark as completed</label>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xl font-bold text-gray-500">No food requests available.</p>
            )}
          </div>

          {/* Aid Request Section */}
          <div className="mt-12 mb-12" id="aid">
            <h2 className="text-4xl font-bold">Aid Requests</h2>
            <p className="mt-4 text-xl">
              Below are the pending aid requests. You can mark a request as completed by checking the box.
            </p>
          </div>

          {/* Display Aid Request Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {aidRequests.length > 0 ? (
              aidRequests.map((request) => (
                <div
                  key={request.id}
                  className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={aidRequestImage}
                      alt="Aid Request"
                      className="w-16 h-16 object-cover mr-4 rounded-full"
                    />
                    <h3 className="text-2xl font-bold">Request Details</h3>
                  </div>

                  <p className="mb-4">{request.details}</p>
                  <p className="text-gray-700 mb-2">
                    <strong>Location:</strong> {request.location}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Phone Number:</strong> {request.phoneNumber || "N/A"}
                  </p>
                  <p className="text-gray-700 mb-4">
                    <strong>Urgency Level:</strong> {request.urgency}
                  </p>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      onChange={() => handleDelete(request.id, "AidRequests")}
                    />
                    <label>Mark as completed</label>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xl font-bold text-gray-500">No aid requests available.</p>
            )}
          </div>

          {/* Rescue Request Section */}
          <div className="mt-12 mb-12" id="rescue">
            <h2 className="text-4xl font-bold">Rescue Requests</h2>
            <p className="mt-4 text-xl">
              Below are the pending rescue requests. You can mark a request as completed by checking the box.
            </p>
          </div>

          {/* Display Rescue Request Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rescueRequests.length > 0 ? (
              rescueRequests.map((request) => (
                <div
                  key={request.id}
                  className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={rescueImage}
                      alt="Rescue Request"
                      className="w-16 h-16 object-cover mr-4 rounded-full"
                    />
                    <h3 className="text-2xl font-bold">Request Details</h3>
                  </div>

                  <p className="mb-4">{request.details}</p>
                  <p className="text-gray-700 mb-2">
                    <strong>Location:</strong> {request.location}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Phone Number:</strong> {request.phoneNumber || "N/A"}
                  </p>
                  <p className="text-gray-700 mb-4">
                    <strong>Urgency Level:</strong> {request.urgency}
                  </p>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      onChange={() => handleDelete(request.id, "RescueRequests")}
                    />
                    <label>Mark as completed</label>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xl font-bold text-gray-500">No rescue requests available.</p>
            )}
          </div>

          {/* SOS Request Section */}
          <div className="mt-12 mb-12" id="sos">
            <h2 className="text-4xl font-bold">SOS Emergency Requests</h2>
            <p className="mt-4 text-xl">
              Below are the SOS requests. You can predict the location using the button below.
            </p>
          </div>

          {/* Display SOS Request Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sosRequests.map((request) => (
              <div key={request.id} className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
                <h3 className="text-2xl font-bold mb-2">SOS Request</h3>
                <p><strong>Latitude:</strong> {request.lat}</p>
                <p><strong>Longitude:</strong> {request.lon}</p>
                <p><strong>Timestamp:</strong> {new Date(request.timestamp.seconds * 1000).toLocaleString()}</p>

                {/* Predict Location Button */}
                <button
                  onClick={() => predictLocation(request.id)} // Use request.id or user identifier to fetch location
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Predict Location
                </button>
              </div>
            ))}
          </div>

          {/* Map Section */}
          {predictedLocation && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-4">Predicted Location</h2>
              <MapContainer center={[predictedLocation.latitude, predictedLocation.longitude]} zoom={13} style={{ height: "400px", width: "100%" }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[predictedLocation.latitude, predictedLocation.longitude]}>
                  <Popup>
                    Predicted location of the missing person.
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default RescueDashboard;
