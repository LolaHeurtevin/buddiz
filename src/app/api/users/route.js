import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { db } from '@lib/db'

export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.split(' ')[1]

    if (!token) {
      return NextResponse.json({ error: 'Token manquant' }, { status: 401 })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )

    const { data: { user }, error } = await supabase.auth.getUser(token)

    if (error || !user) {
      return NextResponse.json({ error: 'Utilisateur non authentifié' }, { status: 401 })
    }

    const userData = await db
      .select()
      .from('users')
      .where('id', '=', user.id)
      .all()

    return NextResponse.json({ user: userData[0] })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
