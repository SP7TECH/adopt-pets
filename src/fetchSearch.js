async function fetchSearch({ queryKey }) {
  const { animal, location, breed } = queryKey[1];

  const res = await fetch(
    `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
  );

  if (!res.ok) {
    throw new Error(
      `Pet Search not ok with ${animal}, ${location} and ${breed}`
    );
  }

  return res.json();
}

export default fetchSearch;
