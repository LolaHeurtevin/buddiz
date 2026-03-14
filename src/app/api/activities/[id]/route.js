import { supabase } from '@lib/supabaseClient'

export async function GET(req, { params }) {
  const { id } = await params;
  try {
    const { data, error } = await supabase
      .from("activity")
      .select("*")
      .eq("id", id)
      .single();

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

export async function PUT(req, { params }) {
  const { id } = await params;
  try {
    const body = await req.json()
    const { title, description, start_date, start_time, estimated_duration, max_participants, address, zip_code, city, country, organizer, lat, lon } = body

    const { data, error } = await supabase
      .from('activity')
      .update({ title, description, start_date, start_time, estimated_duration, max_participants, address, zip_code, city, country, organizer, lat, lon })
      .eq('id', id)
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

export async function DELETE(req, { params }) {
  const { id } = await params;
  try {
    const { data, error } = await supabase
      .from('activity')
      .delete()
      .eq('id', id)
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
