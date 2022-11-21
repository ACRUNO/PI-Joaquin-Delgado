import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getBreedDetails, clearBreedDetail } from "../../actions";
import './Details.css';


export default function BreedDetails() {

    const dispatch = useDispatch();
    const breedDetail = useSelector(state => state.breedDetail)

    const { id } = useParams();

    useEffect(() => {
        dispatch(getBreedDetails(id))

        return () => {
            dispatch(clearBreedDetail());
        }

    }, [dispatch, id]);


    return (
        <div className="detailspage">
            <div className="backdetail">
                <Link to={`/dogs`}>
                    <button className="buttondetail">Back</button>
                </Link>
            </div>
            {breedDetail.length !== 0 ?
                <div className="prueba">
                    <div className="detailcontainer">
                        <div className="detailtitle">
                            <h1>{breedDetail.name}</h1>
                        </div>
                        <div className="contdetailimg">
                            <img className="detailimg" src={breedDetail.img} alt="" />
                        </div>
                        <div className="breeddetails">
                            <p>WEIGHT: {breedDetail.weight_min} - {breedDetail.weight_max}kg</p>
                            <p>LIFE SPAN: {breedDetail.life_span}</p>
                            <span>HEIGHT: {breedDetail.height_min} - {breedDetail.height_max}cm</span>
                        </div>
                        <div>
                            <span className="tempdetail"> 
                                Temperaments:
                            </span>
                            <span className="alltemps">
                                {breedDetail.temperament?.map(t => `${t}`).join(', ')}
                            </span>
                        </div>
                    </div>
                </div>
                :
                <div>
                    <div className="detailcontainer">
                        <h2 className="loading">Loading...</h2>
                    </div>
                </div>
            }

        </div>
    )
}
