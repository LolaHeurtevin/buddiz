"use client"

import ActivityForm from '@components/Activities/ActivityForm'
import { use, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function UpdateActivityPage({ params }) {
  const { id } = use(params);
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null)
  
  useEffect(() => {
    async function loadActivities() {
      try {
        const res = await fetch(`/api/activities/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
       const json = await res.json();
       setData(json.data || []);
       console.log("data loaded for update:", json.data);
      } catch (error) {
        console.error("Erreur lors du chargement de l'activité :", error);
      } finally {
        setLoading(false);
      }
    }
  
    loadActivities();
  }, [id]);

  const [formData, setFormData] = useState({
    id: data?.id,
    title: data?.title || '',
    description: data?.description || '',
    start_date: data?.start_date || '',
    start_time: data?.start_time || '',
    estimated_duration: data?.estimated_duration || 0,
    max_participants: data?.max_participants || 20,
    address: data?.address || '',
    zip_code: data?.zip_code || '',
    city: data?.city || '',
    country: data?.country || '',
    organizer: data?.organizer,
    lat: data?.lat || null,
    lon: data?.lon || null
  })

  // Update formData when data is loaded
  useEffect(() => {
    if (data && data.id) {
      setFormData({
        id: data.id,
        title: data.title || '',
        description: data.description || '',
        start_date: data.start_date || '',
        start_time: data.start_time || '',
        estimated_duration: data.estimated_duration || 0,
        max_participants: data.max_participants || 20,
        address: data.address || '',
        zip_code: data.zip_code || '',
        city: data.city || '',
        country: data.country || '',
        organizer: data.organizer,
        lat: data.lat || null,
        lon: data.lon || null
      })
    }
  }, [data])

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

    // Ajouter les coordonnées au formData
    const updatedFormData = { ...formData, lat, lon };

    // Validation des champs requis
    const requiredFields = [
      'title',
      'start_date',
      'start_time',
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
      const res = await fetch(`/api/activities/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFormData),
      });

      const result = await res.json();
      if (result.success) {
        setStatus('success');
        // ajouter redirection vers la carte
        window.location.href = `/activities/${id}`;
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
      <h1>{t('Update activity')}</h1>
      <form 
        onSubmit={handleSubmit} 
        className="space-y-4">
        <ActivityForm onChange={handleChange} formData={formData} />
        <button type="submit" className="px-4 py-2 bg-main-pink text-white rounded">{t("submit")}</button>
      </form>

      {status === 'loading' && <p>{t('Loading')}...</p>}
      {status === 'success' && <p className="text-green-600">{t('Activity updated')}</p>}
      {status === 'invalid_address' && <p className="text-green-600">{t('Invalid address')}</p>}
      {status === 'error' && <p className="text-red-600">{t('Error')}</p>}
    </div>
  )
}
