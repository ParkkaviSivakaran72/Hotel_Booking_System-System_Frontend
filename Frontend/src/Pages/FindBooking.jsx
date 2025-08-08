import React, { useState } from 'react'


const FindBooking = () => {
    const {confirmationCode, setConfirmationCode} = useState('');
    const [bookingDetails, setBookingDetails] = useState(null);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        if(!confirmationCode.trim()){
            setError('Please enter a confirmation code.');
            setTimeout(() => setError(''), 3000);
            return;
        }
        try {
            const response = await APIService.getBookingByConfirmationCode(confirmationCode);
            setBookingDetails(response.booking);
            setError('');
        } catch (err) {
            setError('Booking not found. Please check the confirmation code and try again.');
            setBookingDetails(null);
            setTimeout(() => setError(''), 3000);
        }
    }
  return (
    <div>FindBooking</div>
  )
  
}

export default FindBooking