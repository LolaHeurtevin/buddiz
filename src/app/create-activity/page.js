"use client"

import { title } from 'process';
import ActivityForm from '../../components/ActivityForm'
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
    const { lat, lon } = await res.json()
    console.log(lat, lon)
    formData.lat = lat
    formData.lon = lon

    try {
      const res = await fetch('/api/activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const result = await res.json()
      if (result.success) {
        setStatus('success');
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
      {status === 'error' && <p className="text-red-600">{t('error')}</p>}
    </div>
  )
}
