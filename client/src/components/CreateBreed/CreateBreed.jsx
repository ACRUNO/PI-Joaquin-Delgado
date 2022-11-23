import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBreed, getAllTemperaments } from "../../actions";
import { useHistory, Link } from "react-router-dom";
import './CreateBreed.css';

function validate(breed) {
    let errors = {};
    if (!breed.name || breed.name.length < 3) {
        errors.name = "Name to short";
    }
    if (breed.height_min < 1 || breed.height_min > 100) {
        errors.height_min = "Height min must be between 1 - 100";
    }
    if (breed.height_max < 1 || breed.height_max > 100) {
        errors.height_max = "Height max must be between 1 - 100";
    }
    if (breed.weight_min < 1 || breed.weight_min > 100) {
        errors.weight_min = "Weight min must be between 1 - 100";
    }
    if (breed.weight_max < 1 || breed.weight_max > 100) {
        errors.weight_max = "Weight max must be between 1 - 100";
    }
    if (breed.life_span < 1 || breed.life_span > 25) {
        errors.life_span = "Life span must be between 1 - 25";
    }
    if (breed.height_min > breed.height_max) {
        errors.height_min = "Height min can't be higher than max"
        errors.height_max = "Height max can't be lower than min"
    }
    if (breed.weight_min > breed.weight_max) {
        errors.weight_min = "Weight min can't be higher than max"
        errors.weight_max = "Weight max can't be lower than min"
    }
    return errors;
}


export default function CreateBreed() {

    const dispatch = useDispatch();
    const temperaments = useSelector(state => state.temperaments)
    const history = useHistory()

    const [breed, setBreed] = useState({
        name: "",
        height_min: "",
        height_max: "",
        weight_min: "",
        weight_max: "",
        life_span: "",
        img: "",
        temperament: []
    })

    const [errors, setErrors] = useState({})


    let disabled =
        !(
            breed.name.length &&
            breed.height_min.length &&
            breed.height_max.length &&
            breed.weight_min.length &&
            breed.weight_max.length &&
            breed.temperament.length
        ) ||
        breed.height_min > 100 || breed.height_min < 1 ||
        breed.height_max > 100 || breed.height_max < 1 ||
        breed.weight_min > 100 || breed.weight_min < 1 ||
        breed.weight_max > 100 || breed.weight_max < 1 ||
        breed.height_min > breed.height_max ||
        breed.weight_min > breed.weight_max ||
        breed.life_span > 25;

    useEffect(() => {
        dispatch(getAllTemperaments())
    }, [dispatch])

    const handleChange = e => {
        e.preventDefault()
        setBreed({
            ...breed,
            [e.target.name]: e.target.value
        })

        setErrors(validate({
            ...breed,
            [e.target.name]: e.target.value
        }))
    }

    const handleDelete = (e, t) => {
        e.preventDefault();
        setBreed({
            ...breed,
            temperament: breed.temperament.filter(v => v !==t)
        })
    }


    const handleSelect = e => {
        e.preventDefault()
        if (breed.temperament.includes(e.target.value)) return alert('Temperament repeated')
        setBreed({
            ...breed,
            temperament: [...breed.temperament, e.target.value]
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(createBreed(breed))
        history.push("/dogs");
    }


    return (
        <div className="createcontainer">
            <div className="createback">
                <div className="prueba">
                    <Link to={`/dogs`}>
                        <button className="buttoncreate">Back</button>
                    </Link>
                </div>
                <div className="createtitle">
                    <h3>Create your Breed</h3>
                </div>
            </div>
            <div className="formcontainer">
                <form onSubmit={e => handleSubmit(e)} autoComplete="off">
                    <div className="formdiv">
                        <label className="labelform">Enter name:
                            <input
                                onChange={(e) => handleChange(e)}
                                className="inputform"
                                type="text"
                                name="name"
                                value={breed.name}
                                placeholder="Name..."
                            />
                            {errors.name && <p className="errors">{errors.name}</p>}
                        </label>
                    </div>
                    <div className="formdiv">
                        <label className="labelform">Height Min:
                            <input
                                onChange={(e) => handleChange(e)}
                                className="inputform"
                                type="number"
                                name="height_min"
                                value={breed.height_min}
                                placeholder="1 - 100..."
                            />
                            {errors.height_min && <p className="errors">{errors.height_min}</p>}
                        </label>
                    </div>
                    <div className="formdiv">
                        <label className="labelform">Height Max:
                            <input
                                onChange={(e) => handleChange(e)}
                                className="inputform"
                                type="number"
                                name="height_max"
                                value={breed.height_max}
                                placeholder="1 - 100..."
                            />
                            {errors.height_max && <p className="errors">{errors.height_max}</p>}
                        </label>
                    </div>
                    <div className="formdiv">
                        <label className="labelform">Weight Min:
                            <input
                                onChange={(e) => handleChange(e)}
                                className="inputform"
                                type="number"
                                name="weight_min"
                                value={breed.weight_min}
                                placeholder="1 - 100..."
                            />
                            {errors.weight_min && <p className="errors">{errors.weight_min}</p>}
                        </label>
                    </div>
                    <div className="formdiv">
                        <label className="labelform">Weight Max:
                            <input
                                onChange={(e) => handleChange(e)}
                                className="inputform"
                                type="number"
                                name="weight_max"
                                value={breed.weight_max}
                                placeholder="1 - 100..."
                            />
                            {errors.weight_max && <p className="errors">{errors.weight_max}</p>}
                        </label>
                    </div>
                    <div className="formdiv">
                        <label className="labelform">Life span:
                            <input
                                onChange={(e) => handleChange(e)}
                                className="inputform"
                                type="number"
                                name="life_span"
                                value={breed.life_span}
                                placeholder="1 - 25..."
                            />
                            {errors.life_span && <p className="errors">{errors.life_span}</p>}
                        </label>
                    </div>
                    <div className="formdiv">
                        <label className="labelform">Image:
                            <input
                                onChange={(e) => handleChange(e)}
                                className="inputform"
                                type="url"
                                name="img"
                                value={breed.img}
                                placeholder="URL..."
                            />
                        </label>
                    </div>
                    <div className="tempforms">
                        <select
                            onChange={(e) => handleSelect(e)}
                            value="Temperaments"
                        >
                            <option disabled>Temperaments</option>
                            {temperaments?.map(t => {
                                return (
                                    <option
                                        value={t.name}
                                        key={t.id}
                                    >
                                        {t.name}
                                    </option>
                                )
                            })}
                        </select>

                        <ul>
                            {breed.temperament?.map((t,i) => {
                                return (
                                    <div className="listform" key={i++}>
                                        <li key={t}>
                                            {t}
                                        </li>
                                        <button className="btndelete" onClick={(e) => handleDelete(e,t)}>X</button>
                                    </div>
                                )
                            })}
                        </ul>

                    </div>
                    <div className="divbtnform">
                        <button className="btnform" disabled={disabled} type="submit">Create Breed!!</button>
                    </div>
                </form>
            </div>
        </div>
    )



}