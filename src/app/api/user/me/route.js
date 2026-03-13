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

    const userId = user.id;

    // Récupérer les données du profil
    const { data: profileData, error: profileError } = await supabase
      .from('profile')
      .select('*')
      .eq('user_id', userId)
      .single();

      console.log("profileData:", profileData)

    if (profileError && profileError.code !== 'PGRST116') throw profileError;
    if (!profileData) {
      return NextResponse.json({ error: 'Profil introuvable' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      user,
      profile: profileData
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}