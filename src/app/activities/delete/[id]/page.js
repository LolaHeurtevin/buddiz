"use client"

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { use } from 'react'

export default function DeleteActivityPage({ params }) {
  const { id } = use(params);
  const { t } = useTranslation();
  const [status, setStatus] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');

    if (e.nativeEvent.submitter.value === 'delete_activity') {
    try {
      const res = await fetch(`/api/activities/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await res.json();
      if (result.success) {
        setStatus('success');
        // ajouter redirection vers la carte
        window.location.href = '/';
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    } 
    } else if (e.nativeEvent.submitter.value === 'change_organizer') {
      // faire l'envoi de notification de reprise d'organisation
      window.location.href = '/';
    }
  }

  return (
    <div>
      <h1>{t("Are you sure you want to delete your activity ?")}</h1>
      <p>{t('If you want to maintain the activity for the other users but no longer wish to be the organizer, click "Change organizer"')}</p>
      <form 
        onSubmit={handleSubmit} 
        className="space-y-4">
        <button type="submit" value="delete_activity" className="px-4 py-2 bg-brand-500 text-white rounded">{t("Delete activity")}</button>
        <button type="submit" value="change_organizer" className="px-4 py-2 bg-cta-500 text-white rounded">{t("Change organizer")}</button>
      </form>

      {status === 'loading' && <p>{t('Loading')}...</p>}
      {status === 'success' && <p className="text-green-600">{t('Activity deleted')}</p>}
      {status === 'error' && <p className="text-red-600">{t('Error')}</p>}
    </div>
  )
}
