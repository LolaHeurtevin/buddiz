import { supabaseServer } from '@lib/supabaseServer'

export async function POST(req) {
  try {
    const supabase = await supabaseServer()

    const { data: { session } } = await supabase.auth.getSession()
    console.log("SESSION:", session)

    const { data: { user } } = await supabase.auth.getUser()
    console.log("USER:", user)

    if (!user) {
      return new Response(JSON.stringify({
        success: false,
        error: "Utilisateur non authentifié"
      }), { status: 401 })
    }

    const userId = user.id

    const body = await req.json()
    const {
      title, description, start_date, start_time,
      estimated_duration, max_participants,
      address, zip_code, city, country,
      lat, lon, category, girl_power, queer_power
    } = body

    const { data, error } = await supabase
      .from('activity')
      .insert([{
        title,
        description,
        start_date,
        start_time,
        estimated_duration,
        max_participants,
        address,
        zip_code,
        city,
        country,
        organizer: userId,
        lat,
        lon,
        category,
        girl_power,
        queer_power
      }])
      .select()

    if (error) throw error

    return new Response(JSON.stringify({ success: true, data }), { status: 201 })

  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({
      success: false,
      error: err.message
    }), { status: 500 })
  }
}

export async function GET() {
  try {
    const supabase = await supabaseServer()
    
    const { data, error } = await supabase
      .from('activity')
      .select('*')

    if (error) throw error

    return new Response(JSON.stringify({ success: true, data }), { status: 200 })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 })
  }
}