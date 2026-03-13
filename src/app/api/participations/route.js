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

    const body = await req.json()
    const { activity_id } = body

    const { data, error } = await supabase
      .from('participate')
      .insert([{
        user_id: user.id,
        activity_id
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
      .from('participate')
      .select('*')

    if (error) throw error

    return new Response(JSON.stringify({ success: true, data }), { status: 200 })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 })
  }
}