import { supabaseServer } from '@/lib/supabaseServer'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const supabase = await supabaseServer()
    const body = await request.json()
    const { email, password, first_name, last_name, gender, pronouns, date_of_birth } = body

    // Validation simple des enums pour éviter les erreurs côté DB
    const validGenders = ['f', 'm', 'other']
    const validPronouns = ['he/him', 'she/her', 'they/them']

    const genderValue = validGenders.includes(gender) ? gender : null
    const pronounsValue = validPronouns.includes(pronouns) ? pronouns : null

    // Création de l'utilisateur
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {}
      }
    })

    if (authError) {
      console.error("Supabase signup error:", authError)
      return NextResponse.json({ error: authError.message }, { status: 400 })
    }

    const userId = authData.user?.id
    if (!userId) {
      return NextResponse.json({ error: 'User ID not returned from Supabase' }, { status: 500 })
    }

    // Insertion dans la table profile
    const { data: profileData, error: profileError } = await supabase
      .from('profile')
      .insert([{
        user_id: userId,
        first_name: first_name || null,
        last_name: last_name || null,
        gender: genderValue,
        pronouns: pronounsValue,
        date_of_birth: date_of_birth || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()

    if (profileError) {
      console.error("Profile insert error:", profileError)
      return NextResponse.json({ error: profileError.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      user: authData.user,
      profile: profileData && profileData.length > 0 ? profileData[0] : null
    }, { status: 201 })

  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}