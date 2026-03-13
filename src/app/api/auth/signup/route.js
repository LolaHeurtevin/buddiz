import { supabaseServer } from '@/lib/supabaseServer'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const supabase = await supabaseServer()
    const body = await request.json()
    const { email, password, first_name, last_name, gender, pronouns, date_of_birth } = body

    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { first_name, last_name, gender, pronouns, date_of_birth }
      }
    })

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, user: data.user }, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}