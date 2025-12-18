"use client"

import { title } from 'process';
import ActivityForm from '@components/Activities/ActivityForm'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function CreateActivityPage() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start_date: '',
    estimated_duration: 0,
    address: '',
    zip_code: '',
    city: '',
    country: '',
    organizer: 1,
    lat: null,
    lon: null
  })

  const [status, setStatus] = useState(null)

  function handleChange(e) {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    console.log(`adresse : ${formData.address}, ${formData.zip_code} ${formData.city}, ${formData.country}`)

    // Transform address to lat/lon
    const res = await fetch('/api/geocode', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address: `${formData.address}, ${formData.zip_code} ${formData.city}, ${formData.country}`})

    })
    const { lat, lon } = await res.json();
    if (!lat || !lon) {
      setStatus('invalid_address');
      return;
    }

    // Ajoutez les coordonnées au formData
    const updatedFormData = { ...formData, lat, lon };

    // Validation des champs requis
    const requiredFields = [
      'title',
      'start_date',
      'estimated_duration',
      'address',
      'zip_code',
      'city',
      'country',
      'organizer',
      'lat',
      'lon',
    ];

    for (const field of requiredFields) {
      if (!updatedFormData[field] || updatedFormData[field] === 0) {
        setStatus('invalid_data');
        console.error(`Le champ requis "${field}" est manquant ou invalide.`);
        return;
      }
    }

    try {
      const res = await fetch('/api/activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFormData),
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
  }

  return (
    <div>
      <h1>Créer une activité</h1>
      <form 
        onSubmit={handleSubmit} 
        className="space-y-4">
        <ActivityForm  onChange={handleChange}/>
        <button type="submit" className="px-4 py-2 bg-main-pink text-white rounded">{t("submit")}</button>
      </form>

      {status === 'loading' && <p>{t('loading')}...</p>}
      {status === 'success' && <p className="text-green-600">{t('activity_created')}</p>}
      {status === 'invalid_address' && <p className="text-green-600">{t('Invalid address')}</p>}
      {status === 'error' && <p className="text-red-600">{t('error')}</p>}
    </div>
  )
}
