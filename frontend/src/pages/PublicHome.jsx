export default function PublicHome() {
  return (
    <div className="container py-5 text-center">
      <h1>Welcome to Our Salon</h1>
      <p>Book your appointment online quickly and easily.</p>

      <a href="/book" className="btn btn-primary mt-3">
        Book Now
      </a>
    </div>
  );
}
