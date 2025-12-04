import { supabase } from '@lib/supabaseClient'

export async function GET(req, { params }) {
  const id = params.id;
  try {
    const { data, error } = await supabase
      .from("activity")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500 }
    );
  }
}
