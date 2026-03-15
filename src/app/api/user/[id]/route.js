import { supabase } from '@lib/supabaseClient'

export async function GET(req) {
  const body = await req.json()
  const { user_id } = body;

  try {
    const { data, error } = await supabase
      .from("user")
      .select("*")
      .eq("id", user_id)
      .single();

    if (error) throw error;

    // Récupérer les données du profil
    const { data: profileData, error: profileError } = await supabase
      .from('profile')
      .select('*')
      .eq('user_id', user_id)
      .single();

      console.log("profileData:", profileData)

    return new Response(JSON.stringify({ success: true, data, profile: profileData }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}