import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate(); // Add navigation hook

  let token = searchParams.get("token");

  const changePassword = async (token, newPassword) => {
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/recoverPassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            password: newPassword,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update password");
      }

      const data = await response.json();
      setMessage(data.message || "Password updated successfully.");
      navigate("/login");
    } catch (error) {
      console.error("Error updating password:", error);
      setMessage(error.message || "Failed to update password");
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (token && password) {
      changePassword(token, password);
    } else {
      setMessage("Invalid token or password.");
    }
  };

  return (
    <div>
      <div>
        <form className="whole-wheat-login" onSubmit={handleClick}>
          <h1>New Password</h1>
          {message && <p>{message}</p>}
          <div>
            <input
              className="password-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn btn-success" type="submit">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
