import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import AdminLayout from "../../Layout/AdminLayout";
import Http from "../../Http";

const ReporterAdd = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [bloodgroup, setBloodgroup] = useState("");
  const [dob, setDob] = useState("");
  const [photo, setPhoto] = useState(null);
  const [highestqualification, setHighestqualification] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [photoPreview, setPhotoPreview] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (photo) {
      const objectUrl = URL.createObjectURL(photo);
      setPhotoPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [photo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("phone", phone);
    formData.append("bloodgroup", bloodgroup);
    formData.append("dob", dob);
    formData.append("photo", photo);
    formData.append("highestqualification", highestqualification);
    formData.append("username", username);
    formData.append("password", password);

    try {
      const response = await fetch(`${Http}/reporters`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error response:", errorText);
        alert("Error submitting form: " + errorText);
        return;
      }

      const result = await response.json();       
      alert(result.message ? result.message : "Data saved successfully");
      navigate("/adminDashboardView");
    } catch (error) {
      console.error("Error submitting form:", error.message);
      alert("Error submitting form: " + error.message);
    }
  };

  return (
   
      <div className="admin-dashboard">
        <h1>Create Reporter</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Address:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Blood Group:</label>
            <input
              type="text"
              value={bloodgroup}
              onChange={(e) => setBloodgroup(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Date of Birth:</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div className="form-group-container">
            <div className="form-group">
              <label>Photo:</label>
              <div className="file-upload-container">
                <input
                  type="file"
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
                {photoPreview && (
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="image-preview"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>Highest Qualification:</label>
            <input
              type="text"
              value={highestqualification}
              onChange={(e) => setHighestqualification(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    
  );
};

export default ReporterAdd;
