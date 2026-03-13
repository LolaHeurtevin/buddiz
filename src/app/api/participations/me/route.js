import { supabaseServer } from '@/lib/supabaseServer'
import { NextResponse } from 'next/server'

export async function GET(request) {
  try {
    const supabase = await supabaseServer();

    // Authentifier l'utilisateur de façon sécurisée
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;
    if (!user) {
      return NextResponse.json({ error: 'Utilisateur non authentifié' }, { status: 401 });
    }

    // Récupérer toutes les participations de l'utilisateur avec les infos de l'activité
    const { data: participations, error } = await supabase
      .from('participate')
      .select('*, activity(*)')  // jointure avec la table activity
      .eq('user_id', user.id);

    if (error && error.code !== 'PGRST116') throw error;

    return NextResponse.json({
      success: true,
      user,
      participations: participations || []
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  const supabase = await supabaseServer();

   // Authentifier l'utilisateur de façon sécurisée
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;
    if (!user) {
      return NextResponse.json({ error: 'Utilisateur non authentifié' }, { status: 401 });
    }

  const body = await req.json()
  const { activity_id } = body

  try {
    const { data, error } = await supabase
      .from('participate')
      .delete()
      .eq('user_id', user.id)
      .eq('activity_id', activity_id)
      .select()

    if (error) throw error

    return new Response(JSON.stringify({ success: true, data }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ success: false, error: err.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}