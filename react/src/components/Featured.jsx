import React from "react"; 
import Promo from "./Promo";


const Featured = (props) => {
    return (
        <>
            <div><h5 className="card-title">Featured</h5></div>
            <br></br><div className="card-container d-flex flex-row justify-content-start" style={{
                gap: "20px", padding: "20px"
            }}>
                {
                    props.promo_data.map((promo) => (
                        <Promo key={promo.id} data={promo} />
                    ))
                }
            </div><br></br>
        </>
    )
}

export default Featured;