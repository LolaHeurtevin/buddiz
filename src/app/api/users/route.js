import { supabase } from '@lib/supabaseClient'
import { db } from '@lib/db'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Vérifier l'utilisateur connecté via Supabase
      const token = req.headers.authorization?.split(' ')[1] // récupérer le Bearer token
      if (!token) return res.status(401).json({ error: 'Token manquant' })

      const { data: { user }, error: authError } = await supabase.auth.getUser(token)
      if (authError || !user) return res.status(401).json({ error: 'Utilisateur non authentifié' })

      // Récupérer les infos utilisateur depuis la table `users`
      const userData = await db
        .select()
        .from('users')
        .where('id', '=', user.id)
        .all()

      res.status(200).json({ user: userData[0] }) 
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
