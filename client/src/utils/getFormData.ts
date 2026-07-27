/* ----------------------------------------------------------------------------------------------
getFormData.ts
This util function returns a formdata for file related uploads 
------------------------------------------------------------------------------------------------- */

function getFormData(object: Record<string, string | Blob>): FormData {
  const formData = new FormData();

  // guard against null or undefined inputs
  if (!object || typeof object !== "object") {
    return formData;
  }

  Object.keys(object).forEach((field: string) => {
    if (object[field] !== undefined && object[field] !== null) {
      formData.append(field, object[field]);
    }
  });

  return formData;
}

export default getFormData;
