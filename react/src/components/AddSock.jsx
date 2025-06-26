import React, { useState } from "react";

const AddSock = (props) => {

    const createSock = () => {
        const aSock = {
            userId: "",
            sockDetails: {
                size: "",
                color: "",
                pattern: "",
                material: "",
                condition: "",
                forFoot: "",
            },
            additionalFeatures: {
                waterResistant: false,
                padded: false,
                antiBacterial: false,
            },
            addedTimestamp: "",
        }
        return aSock;
    }

    const aSock = createSock();
    const [sockData, setSockData] = useState(aSock);


    const handleChange = (e) => {

        if (e.target.name in sockData.sockDetails) {
            setSockData({
                ...sockData,
                sockDetails: { ...sockData.sockDetails, [e.target.name]: e.target.value },
            });
        } else if (e.target.name in sockData.additionalFeatures) {
            setSockData({
                ...sockData,
                additionalFeatures: {
                    ...sockData.additionalFeatures,
                    [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
                },
            });
        } else {
            setSockData({
                ...sockData,
                [e.target.name]: e.target.name,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const now = new Date().toISOString;
        const newSock = { ...sockData, addedTimestamp: now }

        try {
            const response = await fetch(import.meta.env.VITE_SOCKS_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newSock),
            });
            if (!response.ok) {
                throw new Error('Data could not be posted!');
            }
            const res = await response.json();
            console.log('Success:', res);

        } catch (error) {
            console.error('Error posting new sock data:', error);
        }

        props.setData({...props.data, sockData});
    };


    return (
        <>
            <form className="p-3 col-md-6">
                <div className="form-group">
                    <label htmlFor="userId form-label text-left">User ID</label>
                    <input
                        type="text"
                        className="form-control"
                        id="userId"
                        name="userId"
                        //value={sockData.userId}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="size">Size</label>
                    <select
                        className="form-control"
                        id="size"
                        name="size"
                        //value={sockData.sockDetails.size}
                        onChange={handleChange}
                    >
                        <option>Small</option>
                        <option>Medium</option>
                        <option>Large</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="color">Color</label>
                    <input
                        type="text"
                        className="form-control"
                        id="color"
                        name="color"
                        //value={sockData.sockDetails.color}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="pattern">Pattern</label>
                    <input
                        type="text"
                        className="form-control"
                        id="pattern"
                        name="pattern"
                        //value={sockData.sockDetails.pattern}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="material">Material</label>
                    <input
                        type="text"
                        className="form-control"
                        id="material"
                        name="material"
                        //value={sockData.sockDetails.material}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="condition">Condition</label>
                    <select
                        className="form-control"
                        id="condition"
                        name="condition"
                        //value={sockData.sockDetails.condition}
                        onChange={handleChange}
                    >
                        <option>Used</option>
                        <option>New</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="forFoot">For Foot</label>
                    <select
                        className="form-control"
                        id="forFoot"
                        name="forFoot"
                        //value={sockData.sockDetails.condition}
                        onChange={handleChange}
                    >
                        <option>Left</option>
                        <option>Right</option>
                        <option>Both</option>
                    </select>
                </div>
                <div className="row">
                    <div className="form-check col">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="waterResistant"
                            name="waterResistant"
                            //value={sockData.additionalFeatures.waterResistant}
                            onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="waterResistant">
                            Water Resistant
                        </label>
                    </div>
                    <div className="form-check col">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="padded"
                            name="padded"
                            //value={sockData.additionalFeatures.padded}
                            onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="padded">
                            Padded
                        </label>
                    </div>
                    <div className="form-check col">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="antiBacterial"
                            name="antiBacterial"
                            //value={sockData.additionalFeatures.antiBacterial}
                            onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="antiBacterial">
                            Anti Bacterial
                        </label>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary" onSubmit={handleSubmit}>
                    Submit
                </button>
            </form>
        </>

    )
}

export default AddSock;