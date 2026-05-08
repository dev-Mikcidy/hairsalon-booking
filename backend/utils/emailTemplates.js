export const bookingConfirmedTemplate = (booking) => `
  <h2>Your Booking is Confirmed</h2>
  <p>Hello ${booking.customerName},</p>
  <p>Your appointment for <strong>${booking.date}</strong> at <strong>${booking.time}</strong> is confirmed.</p>
  <p>Service: ${booking.serviceName}</p>
`;

export const bookingUpdatedTemplate = (booking) => `
  <h2>Your Booking Was Updated</h2>
  <p>Hello ${booking.customerName},</p>
  <p>Your appointment has been updated to <strong>${booking.date}</strong> at <strong>${booking.time}</strong>.</p>
`;

export const bookingCancelledTemplate = (booking) => `
  <h2>Your Booking Was Cancelled</h2>
  <p>Hello ${booking.customerName},</p>
  <p>Your appointment on <strong>${booking.date}</strong> at <strong>${booking.time}</strong> has been cancelled.</p>
`;
