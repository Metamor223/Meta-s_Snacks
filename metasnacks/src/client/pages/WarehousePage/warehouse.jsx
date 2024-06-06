import React, {useContext, useEffect, useState} from 'react';
import './warehouse.css';
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import {changeWarehouse, fetchWarehouse} from "../../http/warehouseAPI";

const Warehouse = observer(() => {
    const { warehouse } = useContext(Context);
    const [isLoading, setIsLoading] = useState(true);
    const [change, setChange] = useState([]);

    // Function to refetch data and update 'change' state
    const refetchData = () => {
        setIsLoading(true);
        fetchWarehouse()
            .then((data) => {
                if (Array.isArray(data)) {
                    warehouse.setWarehouse(data);
                    setChange(data); // Update 'change' with fetched data
                } else {
                    console.error('Fetched data is not an array:', data);
                }
            })
            .catch((error) => {
                console.error('Error fetching warehouse data:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        refetchData();
    }, []);

    const handleChange = (id, newCount) => {
        // Update 'change' state
        setChange(prevChange => prevChange.map(product =>
            product.id === id ? { ...product, count: newCount } : product
        ));
    };

    const save = () => {
        console.log("Data being sent to backend (change state):", change);
        changeWarehouse(change) // Send 'change' to backend
            .then((data) => {
                // Update MobX store
                warehouse.setWarehouse(data);
                // Update 'change' state to reflect backend changes (if necessary)
                setChange(data);
                refetchData();
            })
            .catch((error) => {
                console.error('Error saving changes:', error);
            });
    };

    return (
        <div className="WarehouseCatalog">
            {isLoading ? (
                <p>Loading...</p>
            ) : warehouse.warehouse.length > 0 ? (
                <ul>
                    {change.map((product) => (
                        <div className={"product"}
                             key={product.id}>
                            <div className="headerProduct">
                                <p>{product.name}</p>
                            </div>
                            <div className="footerProduct">
                                <p><input type="number" value={product.count} onChange={(e)=> handleChange(product.id, parseInt(e.target.value, 10) || 0)}/>шт</p>
                            </div>
                        </div>
                    ))}
                </ul>
            ) : (
                <p>No products found.</p>
            )}
            <button onClick={save} disabled={isLoading}>
                Save changes
            </button>
        </div>
    );
});

export default Warehouse;