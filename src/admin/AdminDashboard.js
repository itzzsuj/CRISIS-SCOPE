import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { db } from "../firebase/firebase"; // Firebase setup
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore"; // Firestore utilities
import { MapContainer, TileLayer, useMap, Marker } from "react-leaflet"; // Leaflet map components
import L from "leaflet";
import "leaflet/dist/leaflet.css"; // Import leaflet styles
import "leaflet.heat"; // Import leaflet heat plugin
import userImage from "../images/userProfile.jpeg"; // Default user image
import one from "../images/CS.jpeg"; // Company logo



function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [locations, setLocations] = useState([]); // For storing lat/lon data
  const [selectedLocation, setSelectedLocation] = useState(null); // To store clicked location for zoom
  const [showModal, setShowModal] = useState(false); // State to show/hide modal

  const navigate = useNavigate(); // Initialize useNavigate hook

  // Fetch Users from Firebase
  useEffect(() => {
    const fetchUsers = async () => {
      const usersSnapshot = await getDocs(collection(db, "Users"));
      const fetchedUsers = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(fetchedUsers);
    };

    fetchUsers();
  }, []);

  // Fetch Lat/Long Locations from Firebase
  useEffect(() => {
    const fetchLocations = async () => {
      const locationsSnapshot = await getDocs(collection(db, "locations")); // Assuming 'locations' collection exists
      const fetchedLocations = locationsSnapshot.docs.map((doc) => ({
        id: doc.id,
        lat: doc.data().lat,
        lon: doc.data().lon,
      }));
      setLocations(fetchedLocations);
    };

    fetchLocations();
  }, []);

  // Handle user deletion
  const handleDeleteUser = async (id) => {
    try {
      await deleteDoc(doc(db, "Users", id));
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      alert("User deleted successfully.");
    } catch (error) {
      console.error("Error deleting user: ", error);
      alert("Failed to delete the user.");
    }
  };

  // Function to handle logout and navigate to MainComponents
  const handleLogout = () => {
    // Any other logout actions you need to do (e.g., Firebase Auth sign-out)
    // Example: firebase.auth().signOut();

    navigate("/"); // Navigate to MainComponents or any other route
  };

  // Function to toggle modal visibility
  const handleShowAllUsers = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Function to navigate to the prediction page
  const handlePredictionClick = () => {
    window.open("http://localhost:8501", "_blank"); // Open in new tab
  };

  // Custom HeatMap Layer using leaflet.heat with more prominent points
  function HeatMap() {
    const map = useMap();
    useEffect(() => {
      if (locations.length > 0) {
        const heatLayer = L.heatLayer(
          locations.map((loc) => [loc.lat, loc.lon, 1]), // [lat, lon, intensity]
          { radius: 35, blur: 20, maxZoom: 15, gradient: { 0.4: 'blue', 0.65: 'lime', 1: 'red' } } // Increase radius, blur for bigger circles
        );
        heatLayer.addTo(map);
      }
    }, [locations, map]);

    return null;
  }

  // Function to zoom to a specific location when clicked
  function ZoomToLocation() {
    const map = useMap();
    useEffect(() => {
      if (selectedLocation) {
        map.setView([selectedLocation.lat, selectedLocation.lon], 14, {
          animate: true,
        });
      }
    }, [selectedLocation, map]);

    return null;
  }

  return (
    <>
      {/* Admin Dashboard Header */}
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
          <a href="#users" className="hover:underline">
            User Management
          </a>
          <a href="#requests" className="hover:underline">
            Request Management
          </a>
          <a href="#heatmap" className="hover:underline">
            HeatMap
          </a>
          <a href="#predictions" className="hover:underline">
            Predicted Affects
          </a>
          <button onClick={handleLogout} className="px-4 py-1.5 whitespace-nowrap bg-yellow-400 rounded-full">
            Logout
          </button>
        </nav>
      </header>

      {/* Admin Dashboard Main Content */}
      <main className="pt-24 px-4 mx-auto max-w-7xl">
        <section className="mt-12" id="users">
          <h2 className="text-4xl font-bold">User Management</h2>
          <p className="mt-4 text-xl">
            Below are the users registered in the system. You can delete a user if necessary.
          </p>

          {/* User List */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
            {users.slice(0, 3).map((user) => (
              <div
                key={user.id}
                className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={user.profileImage || userImage}
                    alt="User Profile"
                    className="w-16 h-16 object-cover mr-4 rounded-full"
                  />
                  <h3 className="text-2xl font-bold">{user.name || "N/A"}</h3>
                </div>
                <p className="text-gray-700 mb-2">
                  <strong>Email:</strong> {user.email || "N/A"}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Phone Number:</strong> {user.phoneNumber || "N/A"}
                </p>
                <div className="flex items-center">
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-md"
                  >
                    Delete User
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Show More Button */}
          {users.length > 3 && (
            <div className="mt-6">
              <button
                onClick={handleShowAllUsers}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
              >
                Continue
              </button>
            </div>
          )}
        </section>

        {/* Predicted Affects Across Areas Section */}
        <section className="mt-12 mb-12" id="predictions">
          <h2 className="text-4xl font-bold">Predicted Affects Across Areas</h2>
          <p className="mt-4 text-xl">
            Use the button below to view predicted disaster affects across different areas.
          </p>
          <div className="mt-6">
            <button
              onClick={handlePredictionClick} // Trigger the navigation on click
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
            >
              View Predictions
            </button>
          </div>
        </section>

        {/* HeatMap Section */}
        <section className="mt-12 mb-12" id="heatmap">
          <h2 className="text-4xl font-bold">HeatMap of Affected Areas</h2>
          <p className="mt-4 text-xl">
            Below is the heatmap displaying locations from the users.
          </p>

          {/* HeatMap Container */}
          <div className="mt-6" style={{ height: "400px", width: "100%" }}>
            <MapContainer center={[37.7749, -122.4194]} zoom={13} style={{ height: "100%", width: "100%" }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {/* Custom HeatMap Layer */}
              <HeatMap />
              {/* Zoom to location on click */}
              <ZoomToLocation />
              {/* Add marker when location is clicked */}
              {selectedLocation && (
                <Marker position={[selectedLocation.lat, selectedLocation.lon]} />
              )}
            </MapContainer>
          </div>
        </section>

        {/* Cards for each Location */}
        <section className="mt-12 mb-12">
          <h2 className="text-4xl font-bold">Location Data</h2>
          <p className="mt-4 text-xl">
            Below are the coordinates retrieved from Firebase. Click on a location to zoom in.
          </p>

          {/* Display Cards for each location */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
            {locations.map((location) => (
              <div
                key={location.id}
                className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
                onClick={() => setSelectedLocation(location)} // Set the location to zoom on click
                style={{ cursor: "pointer" }}
              >
                <p className="text-gray-700 mb-2">
                  <strong>Latitude:</strong> {location.lat}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Longitude:</strong> {location.lon}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Modal Popup for All Users */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg max-w-3xl w-full shadow-lg relative h-3/4 overflow-y-auto"> {/* Added max height and scroll */}
            <h2 className="text-2xl font-bold mb-4">All Users</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={user.profileImage || userImage}
                      alt="User Profile"
                      className="w-16 h-16 object-cover mr-4 rounded-full"
                    />
                    <h3 className="text-2xl font-bold">{user.name || "N/A"}</h3>
                  </div>
                  <p className="text-gray-700 mb-2">
                    <strong>Email:</strong> {user.email || "N/A"}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Phone Number:</strong> {user.phoneNumber || "N/A"}
                  </p>
                  <div className="flex items-center">
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-md"
                    >
                      Delete User
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* Cancel Icon */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl"
            >
              &times; {/* Close the modal with "X" */}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default AdminDashboard;
