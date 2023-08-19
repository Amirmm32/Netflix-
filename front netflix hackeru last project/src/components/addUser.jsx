import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';

const UserForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        visa: '',
        isAdmin: false,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleToggleChange = (event) => {
        const { checked } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            isAdmin: checked,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
        // TODO: Handle form submission, e.g., send data to backend or perform other actions
    };

    return (
        <form className={"add-new-user"} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Visa"
                        name="visa"
                        value={formData.visa}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <Grid container alignItems="center">
                        <Grid item>User</Grid>
                        <Grid item>
                            <Switch
                                name="isAdmin"
                                checked={formData.isAdmin}
                                onChange={handleToggleChange}
                                color="primary"
                            />
                        </Grid>
                        <Grid item>Admin</Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Button type="submit" variant="contained" color="primary">
                Add User
            </Button>
        </form>
    );
};

export default UserForm;
