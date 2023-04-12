import React, { useEffect, useState } from "react";
import Dropdown from './Dropdown'
export default () => {
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(true);
  const [subbreeds, setSubBreedoptions] = useState();
  const [selectedBreed, setbreed] = useState();
  const [selectedSubBreed, setSubBreed] = useState();
  const [selectedNumber, setNumber] = useState();

  const [images, setImages] = useState();
  const maxNumber = 50; // I dislike magic numbers but will be used to define the list max 

  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      const data = await (
        await fetch(
          "https://dog.ceo/api/breeds/list/all"
        )
      ).json();
      setLoading(false);
      // set state when the data received
      setData(data.message);
      setbreed(Object.keys(data.message)[0])
      setNumber(1)
    };
    dataFetch();

  }, []);

  const breedChange = (e) => {
    const breeds = Object.keys(data[e.target.value]).reduce((ret, key) => {
      ret[data[e.target.value][key]] = key;
      return ret;
    }, {});
    setbreed(e.target.value)
    setSubBreedoptions(breeds)
    setSubBreed(Object.keys(breeds)[0])
    setNumber(1)
  };

  const subBreedChange = (e) => {
    setSubBreed(e.target.value)
  };

  const numberChange = (e) => {
    setNumber(e.target.value)
  };

  const getImages = (e) => {
    e.preventDefault();
    let url = '';
    if(selectedSubBreed){
       url = 'https://dog.ceo/api/breed/' + selectedBreed + '/' + selectedSubBreed + '/images/random/' + selectedNumber
    } else {
       url = 'https://dog.ceo/api/breed/' + selectedBreed + '/images/random/' + selectedNumber
    }
    
    const dataFetch = async () => {
      const data = await (
        await fetch(url)
      ).json();
      setImages(data.message);
    };
    dataFetch();

  }

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }
  return (
    <div class="w-full">
      {subbreeds && Object.keys(subbreeds).length > 0 ? (
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="md:w-3/12 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
              Main Breed
            </label>
            <Dropdown
              required={true}
              type={'breed'}
              handleChange={breedChange}
              options={data}
            />
          </div>
          <div class="md:w-3/12 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
              Sub Breed
            </label>
            <Dropdown
              handleChange={subBreedChange}
              type={'subBreed'}
              required={false}
              options={subbreeds}
            />
          </div>
          <div class=" md:w-3/12 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
              Images to return
            </label>
            <Dropdown
              handleChange={numberChange}
              required={true}
              max={maxNumber}
              options={subbreeds}
            />
          </div>
          <div class=" md:w-3/12 px-3 mb-6 md:mb-0 inline-block align-middle">
            <button class="bg-blue-500 align-middle hover:bg-blue-700 text-white font-bold py-2 px-4 items-center align-middle rounded" onClick={getImages}>
              View Images
            </button>
          </div>
        </div>
      ) : (
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="md:w-3/12 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
              Main Breed
            </label>
            <Dropdown
              type={'breed'}
              required={true}
              handleChange={breedChange}
              options={data}
            />
          </div>
          <div class=" md:w-3/12 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
              Images to return
            </label>
            <Dropdown
              handleChange={numberChange}
              type={'ammount'}
              required={true}
              max={maxNumber}
              options={subbreeds}
            />
          </div>
          <div class=" md:w-3/12 px-3 mb-6 md:mb-0 inline-block align-middle">
            <button class="bg-blue-500 align-middle hover:bg-blue-700 text-white font-bold py-2 px-4 align-middle items-center rounded" onClick={getImages}>
              View Images
            </button>
          </div>
        </div>
      )}
      <div class="flex flex-wrap -mx-3 mb-6">
        {images ? (
             Object.values(images).map((item, i) => (
              <img src={item} key={i} class="object-cover max-wh-med rounded p-4" /> 
            ))
        ): null}
      </div>
    </div>
  )
}