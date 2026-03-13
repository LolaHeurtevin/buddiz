export function calculateAge(date_of_birth) {
    if (!date_of_birth) return null;
    const date = new Date(date_of_birth);
    const today = new Date();
    let age = today.getFullYear() - date.getFullYear();
    const m = today.getMonth() - date.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
        age--;
    }
    return age;

}