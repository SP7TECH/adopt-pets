import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useBreedList from "./useBreedList";
import AdoptedPetContext from "./AdoptedPetContext";
import Results from "./Results";
import fetchSearch from "./fetchSearch";

const SearhParams = () => {
  const ANIMALS = ["bird", "cat", "dog", "reptile", "rabbit"];

  const [requestParams, setRequestParams] = useState({
    animal: "",
    location: "",
    breed: "",
  });
  const [adoptedPet] = useContext(AdoptedPetContext);
  const [animal, setAnimal] = useState("");
  const [breeds] = useBreedList(animal);

  const results = useQuery(["search", requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];

  return (
    <div className="search-params">
      <form
        className="mb-10 flex flex-col items-center justify-center rounded-lg bg-gray-200 p-10 shadow-lg"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get("animal") ?? "",
            location: formData.get("location") ?? "",
            breed: formData.get("breed") ?? "",
          };
          setRequestParams(obj);
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input
            id="location"
            name="location"
            type="text"
            className="search-input"
            placeholder="location"
          />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            className="search-input"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
          >
            <option />
            {ANIMALS.map((el) => {
              return <option key={el}>{el}</option>;
            })}
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            className="search-input grayed-out-disabled"
            name="breed"
            disabled={breeds.length === 0}
          >
            <option />
            {breeds.map((el) => {
              return <option key={el}>{el}</option>;
            })}
          </select>
        </label>
        <button className="rounded border-none bg-orange-500 px-6 py-2 text-white hover:opacity-50">
          Submit
        </button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearhParams;
