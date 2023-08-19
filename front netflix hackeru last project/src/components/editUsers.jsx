import React, { useEffect, useState } from "react";
import Joi from 'joi';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { toast, ToastContainer } from "react-toastify";

const UserForm = () => {
  const [formData, setFormData] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    profilePicture: "",
    phone: "",
    visa: "",
    role: "user",
  });
  const [users, setUsers] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({});


    const userSchema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        password: Joi.string().min(0).required(),
        profilePicture: Joi.string().optional(),
        phone: Joi.string().optional(),
        visa: Joi.string().optional(),
        role: Joi.string().optional().default('user').valid('user','admin'),
    });

  useEffect(() => {
    const onLoad = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          credentials: "include",
          redirect: "follow",
        };
        let response = await fetch(
          `http://localhost:5000/api/users/`,
          requestOptions
        );
        const data = await response.json();
        if (!response.ok)
          throw new Error(`${data.message} (${response.status})`);
        setUsers(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    onLoad();
  }, []);
  const handleDeleteUser = async (userId) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        credentials: "include",
        redirect: "follow",
      };
      // Send a DELETE request to the server to delete the item
      let response = await fetch(
        `http://localhost:5000/api/users/${userId}`,
        requestOptions
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`${data.error} (${response.status})`);
      } else {
        setUsers((users) => users.filter((user) => user._id !== userId));
        toast.success("User deleted succesffully");
      }
      // Update the state to remove the deleted item
    } catch (error) {
      toast.error(error.toString());
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleToggleChange = (event) => {
    const { checked } = event.target;
    setFormData((formData   ) => ({
        ...formData,
        role: checked ? "admin" : "user",
    }
    ));
  };

  const clearAfterEdit = () => {
    setFormData({
      _id: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      profilePicture: "",
      phone: "",
      visa: "",
      role: "user",
    });
    setEditMode(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setUsers((prevUsers) => [...prevUsers, formData]);
    // Clear form data after submission
    clearAfterEdit();
  };

  const handleToggleAdmin = async (userId, role) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: JSON.stringify({ role }),
        credentials: "include",
        redirect: "follow",
      };
      // Send a DELETE request to the server to delete the item
      let response = await fetch(
        `http://localhost:5000/api/users/role/${userId}`,
        requestOptions
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`${data.error} (${response.status})`);
      } else {
        setUsers(
          users.map((user) => {
            if (user._id === userId) {
              user.role = role;
              return user;
            } else {
              return user;
            }
          })
        );
        toast.success("User updated role successfully");
      }
      // Update the state to remove the deleted item
    } catch (error) {
      toast.error(error.toString());
    }
  };
  const handleEditButton = async (event, userId) => {
    event.preventDefault();
    const { _id, __v, ...cleanedData } = formData;
    try {
        const validationResult = userSchema.validate(cleanedData, { abortEarly: false, allowUnknown: true });
        if (validationResult.error) {
            const newErrors = {};
            validationResult.error.details.forEach((err) => {
                newErrors[err.context.key] = err.message;
            });
            setErrors(newErrors);
            return;
        }
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(cleanedData),
        credentials: "include",
        redirect: "follow",
      };
      // Send a DELETE request to the server to delete the item
      let response = await fetch(
        `http://localhost:5000/api/users/${userId}`,
        requestOptions
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`${data.error} (${response.status})`);
      } else {
        setUsers(
          users.map((user) => {
            if (user._id === userId) {
              return formData;
            } else {
              return user;
            }
          })
        );
        toast.success("User updated successfully");
        clearAfterEdit();
      }
      // Update the state to remove the deleted item
    } catch (error) {
      toast.error(error.toString());
    }
  };
  const handleAddButton = async (event) => {
    try {
        event.preventDefault();
      const { _id, __v, ...cleanedData } = formData;
        const validationResult = userSchema.validate(cleanedData, { abortEarly: false, allowUnknown: true });
        if (validationResult.error) {
            const newErrors = {};
            validationResult.error.details.forEach((err) => {
                newErrors[err.context.key] = err.message;
            });
            setErrors(newErrors);
            return;
        }
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(cleanedData),
        credentials: "include",
        redirect: "follow",
      };
      // Send a DELETE request to the server to delete the item
      let response = await fetch(
        `http://localhost:5000/api/users/`,
        requestOptions
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`${data.error} (${response.status})`);
      } else {
        setUsers([...users, data.created]);
        toast.success("User Added successfully");
        clearAfterEdit();
      }
      // Update the state to remove the deleted item
    } catch (error) {
      toast.error(error.toString());
    }
  };
  const handleEditUser = async (userId) => {
    setFormData(users.find((user) => user._id === userId));
    setEditMode(true);
  };

  return (
    <Grid className={"edit-users"} container spacing={2}>
      <Grid item xs={5}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Username"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                fullWidth
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Username"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                fullWidth
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                fullWidth
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                fullWidth
                error={!!errors.password}
                helperText={errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Profile Picture"
                name="profilePicture"
                value={formData.profilePicture}
                onChange={handleInputChange}
                fullWidth
                error={!!errors.profilePicture}
                helperText={errors.profilePicture}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                fullWidth
                error={!!errors.phone}
                helperText={errors.phone}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Visa"
                name="visa"
                value={formData.visa}
                onChange={handleInputChange}
                fullWidth
                error={!!errors.visa}
                helperText={errors.visa}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container alignItems="center">
                <Grid item>User</Grid>
                <Grid item>
                  <Switch
                    name="role"
                    checked={formData.role === "admin"}
                    onChange={handleToggleChange}
                    color="primary"
                  />
                </Grid>
                <Grid item>Admin</Grid>
              </Grid>
            </Grid>
          </Grid>
          {editMode ? (
            <Button type="submit" onClick={(event) => handleEditButton(event, formData._id)} variant="contained" color="primary">
              Edit User
            </Button>
          ) : (
            <Button type="submit" onClick={(event)=> handleAddButton(event)} variant="contained" color="primary">
              Add User
            </Button>
          )}
        </form>
      </Grid>
      <Grid item xs={5}>
        <Table>
          <TableBody>
            {users.map((user, index) => (
                <>
              <TableRow key={index + user.email + "one"}>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
              </TableRow>
              <TableRow key={index + user.email + "two"}>
            <TableCell>
              <Switch
                  checked={user.role === "admin"}
                  onChange={() =>
                      handleToggleAdmin(
                          user._id,
                          user.role === "admin" ? "user" : "admin"
                      )
                  }
                  color="primary"
              />
            </TableCell>
            <TableCell>
              <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleDeleteUser(user._id)}
                  startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
              <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<EditIcon />}
                  onClick={() => handleEditUser(user._id)}
              >
                Edit
              </Button>
            </TableCell>
            </TableRow>
                </>
          ))}
          </TableBody>
          <ToastContainer />
        </Table>
      </Grid>
    </Grid>
  );
};

export default UserForm;
