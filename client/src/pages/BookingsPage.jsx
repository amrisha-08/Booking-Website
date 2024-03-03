import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";
import PlaceImg from "../PlaceImg";
import { format } from "date-fns";
import { differenceInCalendarDays } from "date-fns/fp";
export default function BookingsPage() {
    const [bookings, setBookings] = useState('');
    useEffect(() => {
        axios.get('/bookings').then(response => {
            setBookings(response.data);
        });
    }, []);
    return (
        <div>
            <AccountNav />
            <div>
                {bookings?.length > 0 && bookings.map(booking => (
                    <div className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden">
                        <div className="w-72">
                            <PlaceImg place={booking.place} />
                        </div>
                        <div className="py-3 pr-5 grow">
                            <h2 className="text-xl">{booking.place.title}</h2>
                            <div className="border-t border-gray-300 grow mt-2 py-2">
                                {format(new Date(booking.checkIn), 'yyyy-MM-dd')} to {format(new Date(booking.checkOut), 'yyyy-MM-dd')}
                            </div>
                            <div>
                                Number of nights: {differenceInCalendarDays(new Date(booking.checkIn), new Date(booking.checkOut))}<br />
                                Total Price: ₹{booking.price}
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}
