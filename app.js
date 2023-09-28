// Check for Geolocation API support
if ('geolocation' in navigator) {
    // Geolocation is available
    const startTrackingButton = document.getElementById('startTracking');
    const stopTrackingButton = document.getElementById('stopTracking');

    let watchId = null;

    startTrackingButton.addEventListener('click', () => {
        // Request geolocation permission and start tracking
        const options = {
            enableHighAccuracy: true,
            maximumAge: 0,
        };

        watchId = navigator.geolocation.watchPosition(handleLocationUpdate, handleLocationError, options);
    });

    stopTrackingButton.addEventListener('click', () => {
        // Stop tracking when the Stop Tracking button is clicked
        if (watchId !== null) {
            navigator.geolocation.clearWatch(watchId);
            watchId = null;
        }
    });

    function handleLocationUpdate(position) {
        // Handle location updates here
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Create and display a local notification (toast)
        displayLocalNotification(`Latitude: ${latitude}, Longitude: ${longitude}`);
    }

    function handleLocationError(error) {
        // Handle geolocation errors here
        console.error('Geolocation error:', error.message);
    }

    function displayLocalNotification(message) {
        // Implement local notification logic here
        if ('serviceWorker' in navigator && 'Notification' in window) {
            navigator.serviceWorker.ready.then((registration) => {
                registration.showNotification('Location Update', {
                    body: message,
                    icon: 'icon.png',
                });
            });
        }
    }
} else {
    // Geolocation is not available
    console.error('Geolocation is not available in this browser.');
}
