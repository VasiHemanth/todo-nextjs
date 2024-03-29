export function formatISODatetoDDMMYYY(dateString) {
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, 0);
    const day = String(dateObj.getDate()).padStart(2, 0);
  
    return `${day}-${month}-${year}`;
  }