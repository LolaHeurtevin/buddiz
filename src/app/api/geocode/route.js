export async function POST(req) {
  try {
    const { address } = await req.json()

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
    )

    const data = await response.json()

    if (data.length === 0) {
      return new Response(
        JSON.stringify({ error: "Adresse introuvable" }),
        { status: 404 }
      )
    }

    const { lat, lon } = data[0]

    return new Response(JSON.stringify({ lat, lon }), { status: 200 })
  } catch (err) {
    console.error(err)
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    )
  }
}
