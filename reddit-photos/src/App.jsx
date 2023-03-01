import { useEffect, useState } from "react";
import Nav from "./components/Nav";
import Image from "./components/Image";
import { nanoid } from "nanoid";
function App() {
  let [images, setImages] = useState([]);
  let [user, setUser] = useState("wagstaffmedia");
  let [isLoading, setIsLoading] = useState(true);

  // Get images
  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch(
        `https://www.reddit.com/user/${user}.json?limit=100`
      );
      response = await response.json();
      // Create an array of the images
      let imagesArray = response.data.children.map((image) => image.data.url);
      // Filter the array for duplicate posts
      function removeDuplicates(arr) {
        return arr.filter((item, index) => arr.indexOf(item) === index);
      }
      // no duplicate images
      let imagesArr = removeDuplicates(imagesArray);
      setImages(imagesArr);
      setIsLoading(false);
      console.log(images);
    }
    fetchMyAPI();
  }, [user]);

  // Only images
  let renderImages = images.map((image) =>
    image === undefined ? "" : <Image src={image} key={nanoid()} />
  );

  // Modal display

  return (
    <div className="max-w-5xl">
      <Nav />
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {renderImages}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
