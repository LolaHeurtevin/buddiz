import { supabase } from '@lib/supabaseClient'


export async function POST(req) {
  try {
    const body = await req.json()
    const { title, description, start_date, estimated_duration, address, zip_code, city, country, organizer } = body

    const { data, error } = await supabase
      .from('activity')
      .insert([{ title, description, start_date, estimated_duration, address, zip_code, city, country, organizer }])
      .select()

    if (error) throw error

    return new Response(JSON.stringify({ success: true, data }), { status: 201 })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 })
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('activity')
      .select('*')

    if (error) throw error

    return new Response(JSON.stringify({ success: true, data }), { status: 201 })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 })
  }
}