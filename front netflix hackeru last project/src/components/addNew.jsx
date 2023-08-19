import React, { useState } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import Joi from 'joi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialFormData = {
    posterUrl: "",
    seriesTitle: "",
    releasedYear: 2023,
    certificate: "",
    runtime: "",
    genre: "",
    imdbRating: "",
    overview: "",
    metaScore: "",
    director: "",
    starFirst: "",
    starSecond: "",
    starThird: "",
    starFourth: "",
    votesCount: "",
    gross: "",
};

const schema = Joi.object({
    posterUrl: Joi.string().required(),
    seriesTitle: Joi.string().required(),
    releasedYear: Joi.number().integer().min(1800).max(new Date().getFullYear()).required(),
    certificate: Joi.string(),
    runtime: Joi.string(),
    genre: Joi.string().required(),
    imdbRating: Joi.number().min(0).max(10),
    overview: Joi.string().required(),
    metaScore: Joi.number().min(0).max(100),
    director: Joi.string(),
    starFirst: Joi.string(),
    starSecond: Joi.string(),
    starThird: Joi.string(),
    starFourth: Joi.string(),
    votesCount: Joi.number().integer().min(0),
    gross: Joi.string(),
});

const MyFormComponent = () => {
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleDateChange = (date) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            releasedYear: date,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationResult = schema.validate(formData, { abortEarly: false, allowUnknown: true });

        if (validationResult.error) {
            const newErrors = {};
            validationResult.error.details.forEach((err) => {
                newErrors[err.context.key] = err.message;
            });
            setErrors(newErrors);
            return;
        }

        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const raw = JSON.stringify(formData);
            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                credentials: 'include',
                redirect: 'follow',
            };
            const response = await fetch(`http://localhost:5000/api/movies`, requestOptions);
            const data = await response.json();
            if (!response.ok) throw new Error(`${data.message} (${response.status})`);
            toast.success('Added movie successfully!');
        } catch (error) {
            toast.error(error.toString());
        }
    };
    return (
        <form className={"add-new-movie"} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Poster URL"
                        name="posterUrl"
                        value={formData.posterUrl}
                        onChange={handleInputChange}
                        fullWidth
                        error={!!errors.posterUrl}
                        helperText={errors.posterUrl}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Series Title"
                        name="seriesTitle"
                        value={formData.seriesTitle}
                        onChange={handleInputChange}
                        fullWidth
                        error={!!errors.seriesTitle}
                        helperText={errors.seriesTitle}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Released Year"
                        name="releasedYear"
                        value={formData.releasedYear}
                        onChange={handleInputChange}
                        fullWidth
                        error={!!errors.releasedYear}
                        helperText={errors.releasedYear}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Certificate"
                        name="certificate"
                        value={formData.certificate}
                        onChange={handleInputChange}
                        fullWidth
                        error={!!errors.certificate}
                        helperText={errors.certificate}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Runtime"
                        name="runtime"
                        value={formData.runtime}
                        onChange={handleInputChange}
                        fullWidth
                        error={!!errors.runtime}
                        helperText={errors.runtime}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Genre"
                        name="genre"
                        value={formData.genre}
                        onChange={handleInputChange}
                        fullWidth
                        error={!!errors.genre}
                        helperText={errors.genre}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="IMDB Rating"
                        name="imdbRating"
                        value={formData.imdbRating}
                        onChange={handleInputChange}
                        fullWidth
                        error={!!errors.imdbRating}
                        helperText={errors.imdbRating}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Overview"
                        name="overview"
                        value={formData.overview}
                        onChange={handleInputChange}
                        fullWidth
                        error={!!errors.overview}
                        helperText={errors.overview}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Meta Score"
                        name="metaScore"
                        value={formData.metaScore}
                        onChange={handleInputChange}
                        fullWidth
                        error={!!errors.metaScore}
                        helperText={errors.metaScore}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Director"
                        name="director"
                        value={formData.director}
                        onChange={handleInputChange}
                        fullWidth
                        error={!!errors.director}
                        helperText={errors.director}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="First Star"
                        name="starFirst"
                        value={formData.starFirst}
                        onChange={handleInputChange}
                        fullWidth
                        error={!!errors.starFirst}
                        helperText={errors.starFirst}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Second Star"
                        name="starSecond"
                        value={formData.starSecond}
                        onChange={handleInputChange}
                        fullWidth
                        error={!!errors.starSecond}
                        helperText={errors.starSecond}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Third Star"
                        name="starThird"
                        value={formData.starThird}
                        onChange={handleInputChange}
                        fullWidth
                        error={!!errors.starThird}
                        helperText={errors.starThird}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Fourth Star"
                        name="starFourth"
                        value={formData.starFourth}
                        onChange={handleInputChange}
                        fullWidth
                        error={!!errors.starFourth}
                        helperText={errors.starFourth}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Votes Count"
                        name="votesCount"
                        value={formData.votesCount}
                        onChange={handleInputChange}
                        fullWidth
                        error={!!errors.votesCount}
                        helperText={errors.votesCount}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Gross"
                        name="gross"
                        value={formData.gross}
                        onChange={handleInputChange}
                        fullWidth
                        error={!!errors.gross}
                        helperText={errors.gross}
                    />
                </Grid>
            </Grid>
            <ToastContainer />
            <Button type="submit" variant="contained" color="primary">
                Save
            </Button>
        </form>
    );
};

export default MyFormComponent;
