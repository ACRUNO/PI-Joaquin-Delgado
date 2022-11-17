import React, { useEffect, useState }  from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBreed, getAllTemperaments } from "../../actions";
import { useHistory, Link } from "react-router-dom";


export default function CreateBreed() {

    const dispatch = useDispatch();
    const temperaments = useSelector(state => state.temperaments)
    const history = useHistory()

    const [breed, setBreed] = useState({
        name: "",
        height_min: 0,
        height_max: 0,
        weight_min: 0,
        weight_max: 0,
        life_span: 0,
        img: "",
        temperament: []
    })

    useEffect(() => {
        dispatch(getAllTemperaments())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleChange = e => {
        setBreed({
            ...breed,
            [e.target.name]: e.target.value
        })
    }

    const handleSelect = e => {
        if (breed.temperament.includes(e.target.value)) return alert('Temperament repeated')
        setBreed({
            ...breed,
            temperament: [...breed.temperament, e.target.value]
        })
    }

    const handleSubmit = e => {
        dispatch(createBreed(breed))
        history.push("/dogs");
    }



    return (
        <div>
            <div>
                <Link to={`/dogs`}>
                    <button>Back</button>
                </Link>
            </div>
            <h3>Create your Breed</h3>
            <form onSubmit={e => handleSubmit(e)}>
                
                <label>Enter name:
                    <input 
                        onChange={(e) => handleChange(e)}
                        type="text"
                        name="name"
                        value={breed.name}
                        placeholder="Enter name..."
                    />
                </label>
                
                <label>Height Min:
                    <input
                        onChange={(e) => handleChange(e)}
                        type="number"
                        name="height_min"
                        value={breed.height_min}
                        placeholder="1 - 100..."
                    />
                </label>
                
                <label>Height Max:
                    <input 
                        onChange={(e) => handleChange(e)}
                        type="number"
                        name="height_max"
                        value={breed.height_max}
                        placeholder="1 - 100..."
                    />
                </label>

                <label>Weight Min:
                    <input
                        onChange={(e) => handleChange(e)}
                        type="number"
                        name="weight_min"
                        value={breed.weight_min}
                        placeholder="1 - 100..."
                    />
                </label>

                <label>Weight Max:
                    <input
                        onChange={(e) => handleChange(e)}
                        type="number"
                        name="weight_max"
                        value={breed.weight_max}
                        placeholder="1 - 100..."
                    />
                </label>

                <label>Life span:
                    <input
                        onChange={(e) => handleChange(e)}
                        type="number"
                        name="life_span"
                        value={breed.life_span}
                        placeholder="1 - 25..."
                    />
                </label>
                
                <label>Image:
                    <input 
                        onChange={(e) => handleChange(e)}
                        type="text"
                        name="img"
                        value={breed.img}
                        placeholder="URL..."
                    />
                </label>

                <div>
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
                        {breed.temperament?.map(t => {
                            return (
                                <li>
                                    {t}
                                </li>
                            )
                        })}
                    </ul>

                </div>

                <button type="submit">Create</button>
            </form>
        </div>
    )



}