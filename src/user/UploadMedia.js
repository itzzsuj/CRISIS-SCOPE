import React, { useState } from "react";
import { db, storage } from "../firebase/firebase"; // Import Firestore and Storage
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // Firebase Storage utilities
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing

const UploadMedia = () => {
  const [mediaDescription, setMediaDescription] = useState("");
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaURL, setMediaURL] = useState(""); // Store uploaded media URL
  const [locationStatus, setLocationStatus] = useState("Fetching location...");
  const [location, setLocation] = useState({ lat: null, lon: null }); // Store user location
  const [loading, setLoading] = useState(false);
  const MAX_FILE_SIZE_MB = 10;

  const navigate = useNavigate(); // Initialize the navigate hook

  // Fetch location on component mount
  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setLocation({ lat, lon });
          setLocationStatus(`Location: (${lat}, ${lon})`);
        },
        (error) => {
          console.error("Error fetching location: ", error);
          setLocationStatus("Failed to fetch location.");
        }
      );
    } else {
      setLocationStatus("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size / 1024 / 1024 <= MAX_FILE_SIZE_MB) {
      setMediaFile(file);
    } else {
      alert(`File size should not exceed ${MAX_FILE_SIZE_MB} MB.`);
      setMediaFile(null);
    }
  };

  const handleUpload = async (file) => {
    if (!file) return null;

    // Create a reference to the file in Firebase Storage
    const storageRef = ref(storage, `uploads/${file.name}`);

    // Upload file to Firebase Storage
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Return a promise that resolves when the upload is complete and gets the file URL
    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // You can track upload progress here if you want
        },
        (error) => {
          console.error("Error during upload:", error); // Log any errors during upload
          reject(error); // Reject the promise on error
        },
        () => {
          // On successful upload, get the file's URL
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              resolve(downloadURL);
            })
            .catch((error) => {
              console.error("Error getting download URL:", error); // Log errors getting the download URL
              reject(error);
            });
        }
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const uploadedMediaURL = await handleUpload(mediaFile); // Upload the file

      if (uploadedMediaURL) {
        // Save the media details in Firestore along with lat and lon
        await addDoc(collection(db, "MediaUploads"), {
          mediaDescription,
          lat: location.lat, // Latitude from geolocation
          lon: location.lon, // Longitude from geolocation
          mediaURL: uploadedMediaURL, // Store the media URL from Firebase Storage
          timestamp: new Date(),
        });
        alert("Media uploaded successfully.");
        setMediaDescription("");
        setMediaFile(null);
        setMediaURL(""); // Reset form

        // Navigate to UserDashboard after successful upload
        navigate("/UserDashboard"); // Route to UserDashboard
      } else {
        alert("Failed to upload media. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading media:", error); // Catch and log any errors during submission
      alert("Failed to upload media.");
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-6 mt-24">
      <h1 className="text-3xl font-bold text-center mb-6">Upload Photo/Video</h1>
      <p className="text-center mb-8 text-xl">
        Help by uploading photos or videos. Maximum file size: {MAX_FILE_SIZE_MB} MB.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
        <div>
          <label className="block text-lg font-medium text-gray-700">Media Description</label>
          <textarea
            className="w-full mt-2 p-3 border border-gray-300 rounded-md"
            placeholder="Describe the media"
            value={mediaDescription}
            onChange={(e) => setMediaDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700">Location</label>
          <input
            type="text"
            className="w-full mt-2 p-3 border border-gray-300 rounded-md"
            placeholder="Location will be auto-filled"
            value={locationStatus}
            readOnly
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700">Upload Media</label>
          <input
            type="file"
            className="w-full mt-2"
            accept="image/*, video/*"
            onChange={handleFileChange}
            required
          />
        </div>
        <button
          type="submit"
          className={`w-full py-3 px-6 bg-blue-600 text-white rounded-md font-bold hover:bg-blue-700 transition duration-300 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={loading || !mediaFile} // Disable if no media file selected
        >
          {loading ? "Uploading..." : "Upload Media"}
        </button>
      </form>
    </div>
  );
};

export default UploadMedia;
