import React, { useState, useEffect, useContext } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import useDropdown from "./useDropdown";
import Results from "./Results";
import ThemeContext from './ThemeContext'


const SearchParams = () => {
  const [location, updateLocation] = useState("Seattle, WA");
  const [breeds, updateBreeds] = useState([]);
  const [pets, setPets] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, updateBreed] = useDropdown("Breed", "", breeds);
  const [theme, setTheme]=useContext(ThemeContext)

  async function requestPets() {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal
    });

    setPets(animals || []);


  }

  useEffect(() => {
    updateBreeds([]);
    updateBreed("");

    pet.breeds(animal).then(({ breeds }) => {
      const breedStrings = breeds.map(({ name }) => name);
      updateBreeds(breedStrings);
    }, console.error);
  }, [animal]);

  function submitHandler(e){
    e.preventDefault()
    requestPets()
  }

  return (

    <div className="search-params">
      <form onSubmit={submitHandler}>
        <label htmlFor="location">
        {console.log("qweq",pets)}
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={e => updateLocation(e.target.value)}
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <label htmlFor="theme">
          Theme 
          <select value={theme} 
          onChange={e=>setTheme(e.target.value)}
          onBlur={e=>setTheme(e.target.value)}
          >
            <option value="peru">Peru</option>
            <option value="darkblue">Dark blue</option>
            <option value="mediumorchid">Medium Orchid</option>
            <option value="Chartreuse">Chartreuse</option>
          </select>
        </label>
        <button style={ {backgroundColor:theme}}>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
