export async function participate(e, activity, reload = () => {}) {
    e.stopPropagation(); // Prevent the click event from propagating to the Link
    e.preventDefault(); // Prevent default behavior of the Link
        
    try {
      const res = await fetch('/api/participations', {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ activity_id: activity.id }),
      })

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erreur lors de l'inscription à l'activité")
      } else {
        reload()
      }
  
    } catch (err) {
      console.error(err)
    } 
  }

export async function deleteParticipation(e, activity, reload = () => {}) {
    e.stopPropagation(); // Prevent the click event from propagating to the Link
    e.preventDefault(); // Prevent default behavior of the Link
    console.log("unparticipate");
        
    try {
      const res = await fetch('/api/participations/me', {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ activity_id: activity.id }),
      })

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erreur lors de l'inscription à l'activité")
      } else {
        reload()
      }
  
    } catch (err) {
      console.error(err)
    } 
  }