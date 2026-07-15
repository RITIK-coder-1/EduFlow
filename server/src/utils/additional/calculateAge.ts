/* ---------------------------------------------------------------------------------------
calculateAge.ts
This utility is used to calculate the age of the users for specific actions that require adult oversight 
------------------------------------------------------------------------------------------ */

const calculateAge = (birthDateString: string): number => {
  const today: Date = new Date();
  const birthDate: Date = new Date(birthDateString);

  // Initial calculation based on year
  let age: number = today.getFullYear() - birthDate.getFullYear();

  // Calculate month difference
  const monthDiff: number = today.getMonth() - birthDate.getMonth();

  // Adjusting if the birthday hasn't occurred yet in the current year
  // If the birth month is after the current month, OR
  // If it's the birth month but the birth day hasn't passed yet
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

export default calculateAge;
