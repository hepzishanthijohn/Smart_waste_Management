import React, { createContext, useState, useContext } from 'react';

const WasteContext = createContext();

const initialState = {
    bins: [
        { id: 1, weight: 0, gasDetected: false },
        { id: 2, weight: 0, gasDetected: false },
    ],
    buzzer: false,
    lightIndicator: false,
    alertMessage: ''
};

export const WasteProvider = ({ children }) => {
    const [state, setState] = useState(initialState);

    const updateBinStatus = (binId, newWeight, gasDetected) => {
        setState(prevState => {
            const updatedBins = prevState.bins.map(bin => {
                if (bin.id === binId) {
                    bin.weight = newWeight;
                    bin.gasDetected = gasDetected;
                    return bin;
                }
                return bin;
            });

            const newBuzzerState = updatedBins.some(bin => bin.weight >= 20 || bin.gasDetected); // If any bin is full or has gas detected
            const newLightIndicatorState = updatedBins.some(bin => bin.weight >= 20);  // Light indicator if any bin is full
            const newAlertMessage = updatedBins.some(bin => bin.gasDetected)
                ? 'Dangerous gas detected. Evacuate!'
                : updatedBins.some(bin => bin.weight >= 20)
                ? 'One or more bins are full. Please collect waste.'
                : '';

            return {
                ...prevState,
                bins: updatedBins,
                buzzer: newBuzzerState,
                lightIndicator: newLightIndicatorState,
                alertMessage: newAlertMessage
            };
        });
    };

    return (
        <WasteContext.Provider value={{ state, updateBinStatus }}>
            {children}
        </WasteContext.Provider>
    );
};

export const useWasteContext = () => useContext(WasteContext);
