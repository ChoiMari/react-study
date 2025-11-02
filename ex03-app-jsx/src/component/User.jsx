import React from "react";

const User = ({ user }) => {
  return (
    <div style={styles.container}>
      <img
        src={user.imgUrl}
        alt={`${user.name}s avatar`}
        style={styles.avatar}
      />
      <h3 style={styles.name}>{user.name}</h3>
      <p style={styles.info}>{user.age}</p>
      <p style={styles.info}>{user.email}</p>
    </div>
  );
};

export default User;

const styles = {
  //json 객체
  container: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    maxWidth: "300px",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
  },
  avatar: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
  },
  name: {
    fontSize: "24px",
    margin: "10px 0",
  },
  info: {
    fontSize: "16px",
    margin: "5px 0",
  },
};
