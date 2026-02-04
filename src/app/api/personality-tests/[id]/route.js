import { supabase } from '@lib/supabaseClient'

export async function GET(req, { params }) {
  const { id } = await params;
  try {
    const { data, error } = await supabase
      .from("personality_test_questions_answers")
      .select("*")
      .eq("test_id", Number(id))

    if (error) throw error;

    return new Response(JSON.stringify({ success: true, data }), {
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