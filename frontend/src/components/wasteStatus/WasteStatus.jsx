import React, { useState, useEffect } from 'react';
import { useWasteContext } from '../../context/WasteContext';
import { Button, Card, ProgressBar, Alert } from 'react-bootstrap';

const WasteStatus = () => {
    const { state, updateBinStatus } = useWasteContext();

    // Set the maximum weight for the bin to 10kg
    const MAX_BIN_WEIGHT = 10;

    // Function to handle adding trash to a bin
    const addTrashToBin = (binId) => {
        // Simulate adding a random amount of trash (1 to 2 kg)
        const additionalWeight = Math.floor(Math.random() * 2) + 1; // Add between 1 and 2 kg

        // Find the bin by ID
        const bin = state.bins.find(bin => bin.id === binId);
        const newWeight = bin.weight + additionalWeight;

        // Check if the bin has reached the maximum weight
        if (newWeight >= MAX_BIN_WEIGHT) {
            // Update the bin as full
            updateBinStatus(binId, MAX_BIN_WEIGHT, true);  // Mark bin as full, optional gas detection
            return `Bin ${binId} is full!`;
        }

        // Otherwise, update the bin weight and keep gas detection as false
        updateBinStatus(binId, newWeight, false);
        return `Bin ${binId} now has ${newWeight}kg of trash.`;
    };

    // Handle adding trash manually via a button click
    const handleAddTrash = (binId) => {
        const statusMessage = addTrashToBin(binId); // Add trash to the selected bin
        alert(statusMessage); // Display the status message as an alert
    };

    useEffect(() => {
        // Optionally, you can simulate periodic updates (e.g., every 5 seconds)
        // but in this case, we're using manual addition instead.
        const interval = setInterval(() => {
            // Simulate automatic trash addition every 5 seconds
            addTrashToBin(1); // Add trash to Bin 1
            addTrashToBin(2); // Add trash to Bin 2
        }, 5000);

        return () => clearInterval(interval);  // Cleanup on unmount
    }, [state.bins, updateBinStatus]);

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Waste Management System</h1>

            {state.alertMessage && <Alert variant="danger">{state.alertMessage}</Alert>}

            <div className="row">
                {state.bins.map((bin) => (
                    <div key={bin.id} className="col-12 col-md-6 col-lg-4 mb-4">
                        <Card className="shadow-sm">
                            <Card.Body>
                                <Card.Title>Bin {bin.id}</Card.Title>

                                {/* Progress bar to show bin's trash level */}
                                <ProgressBar
                                    now={(bin.weight / MAX_BIN_WEIGHT) * 100}
                                    label={`${bin.weight}kg`}
                                    variant={bin.weight >= MAX_BIN_WEIGHT ? 'danger' : 'success'}
                                    className="mb-3"
                                />
                                <Card.Text>
                                    {bin.weight >= MAX_BIN_WEIGHT ? (
                                        <div className="alert alert-danger">Bin is Full!</div>
                                    ) : (
                                        <div>Bin has {MAX_BIN_WEIGHT - bin.weight}kg capacity left</div>
                                    )}
                                    <div>{bin.gasDetected ? 'Dangerous gas detected!' : 'No dangerous gases detected'}</div>
                                </Card.Text>

                                {/* Button to manually add trash to the bin */}
                                <Button
                                    variant="primary"
                                    onClick={() => handleAddTrash(bin.id)}
                                    disabled={bin.weight >= MAX_BIN_WEIGHT}
                                    className="w-100"
                                >
                                    {bin.weight >= MAX_BIN_WEIGHT ? 'Bin is Full' : 'Add Trash'}
                                </Button>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>

            {/* Additional Alerts */}
            {state.buzzer && (
                <Alert variant="warning">
                    <strong>Buzzer is ON - Alert!</strong>
                </Alert>
            )}
            {state.lightIndicator && (
                <Alert variant="info">
                    <strong>Light is ON - Please collect waste!</strong>
                </Alert>
            )}
        </div>
    );
};

export default WasteStatus;
