export async function POST(req) {
  try {
    const { address } = await req.json()

    if (!address || address.trim() === '') {
      return new Response(
        JSON.stringify({ error: "Adresse vide" }),
        { status: 400 }
      )
    }

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`,
      {
        headers: {
          'User-Agent': 'Buddiz App (https://buddiz.app)',
          'Accept': 'application/json'
        }
      }
    )

    if (!response.ok) {
      console.error(`Nominatim error: ${response.status} ${response.statusText}`)
      const text = await response.text()
      console.error("Response:", text.substring(0, 200))
      throw new Error(`Geocode service returned ${response.status}`)
    }

    let data
    try {
      data = await response.json()
    } catch (parseErr) {
      const text = await response.text()
      console.error('JSON parse error. Response:', text.substring(0, 200))
      throw new Error("Service de géocodage indisponible")
    }

    if (!Array.isArray(data) || data.length === 0) {
      return new Response(
        JSON.stringify({ error: "Adresse introuvable" }),
        { status: 404 }
      )
    }

    const { lat, lon } = data[0]

    return new Response(JSON.stringify({ lat, lon }), { status: 200 })
  } catch (err) {
    console.error('Geocode error:', err)
    return new Response(
      JSON.stringify({ error: err.message || "Erreur de géocodage" }),
      { status: 500 }
    )
  }
}
