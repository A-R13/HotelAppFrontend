// HELPER FUNCTION TO CONVERT FILE INTO URL FOR THUMBNAIL
export const fileToDataUrl = (file) => {
  const validFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  const valid = validFileTypes.find((type) => type === file.type);
  // Bad data, let's walk away.
  if (!valid) {
    throw Error('provided file is not a png, jpg or jpeg image.');
  }

  const reader = new FileReader();
  const dataUrlPromise = new Promise((resolve, reject) => {
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
  });
  reader.readAsDataURL(file);
  return dataUrlPromise;
}

export const getAllListings = async () => {
  const response = await fetch('http://localhost:5005/listings', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    }
  });

  const data = await response.json();
  return data;
}

export const getSpecificListing = async (listingId, token) => {
  const response = await fetch(`http://localhost:5005/listings/${listingId}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  });

  const data = await response.json();
  return data;
}
