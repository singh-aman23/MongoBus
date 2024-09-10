"use server";
export default async function handleForm(prevState, formData) {
  const startingLocation = formData.get("startingLocation");
  const endingLocation = formData.get("finalLocation");
  let errors = [];

  if (
    !startingLocation ||
    startingLocation.trim().length === 0 ||
    !endingLocation ||
    endingLocation.trim().length === 0
  ) {
    errors.push("error");
  }
  console.log(startingLocation, endingLocation);

  return { errors };
}
