/* ----------------------------------------------------------------------------------------------
getFormData.ts
This util function returns a formdata for file related uploads 
------------------------------------------------------------------------------------------------- */

// Record<string, string | blob> is too restrictive so I had to use a generic
function getFormData<T extends Record<string, any>>(object: T): FormData {
  const formData = new FormData();

  if (!object || typeof object !== "object") {
    return formData;
  }

  Object.keys(object).forEach((field) => {
    const value = object[field];

    if (value !== undefined && value !== null) {
      if (value instanceof Blob) {
        // Blobs and Files are appended directly
        formData.append(field, value);
      } else {
        // Safely convert primitives (numbers, booleans) to strings
        formData.append(field, String(value));
      }
    }
  });

  return formData;
}

export default getFormData;
