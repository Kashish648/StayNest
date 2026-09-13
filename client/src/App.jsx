import { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query.trim()) {
      setError("Please describe what you're looking for.");
      return;
    }

    setLoading(true);
    setError("");
    setListings([]);

    try {
      const response = await fetch(
        "/api/ai/recommend",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: query,
          }),
        }
      );

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Something went wrong.");
      }

      setListings(data.listings);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>AI Stay Finder</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Try: I want a stay in Delhi under ₹3000"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button type="submit">
          {loading ? "Searching..." : "Find Stays"}
        </button>
      </form>

      {error && <p>{error}</p>}

      {listings.length > 0 && (
        <div>
          <h2>Recommended Stays</h2>

          {listings.map((listing) => (
            <div key={listing._id}>
              <h3>{listing.title}</h3>
              <p>📍 {listing.location}</p>
              <p>₹{listing.price}</p>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && listings.length === 0 && (
        <p>Tell me what kind of stay you're looking for.</p>
      )}
    </div>
  );
}

export default App;