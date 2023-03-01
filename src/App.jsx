import { useEffect, useState } from "react";
import Nav from "./components/Nav";
import Image from "./components/Image";
import Modal from "./components/Modal";
import { nanoid } from "nanoid";
function App() {
  let [images, setImages] = useState([]);
  let [user, setUser] = useState("Alaric_Darconville");
  let [isLoading, setIsLoading] = useState(true);
  let [modal, setModal] = useState({
    show: false,
    url: "",
  });
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
    }
    fetchMyAPI();
  }, [user]);

  // Only images
  let renderImages = images.map((image) =>
    image === undefined || !image.includes("i.redd.it") ? (
      ""
    ) : (
      <Image src={image} key={nanoid()} handleClick={handleClick} />
    )
  );

  // Handle submit,
  function handleSubmit(event) {
    event.preventDefault();
    setUser(event.target.value);
  }

  // Modal
  function handleClick(event) {
    setModal({ show: true, url: event.target.src });
  }

  function closeModal(event) {
    setModal({ show: false, url: "" });
  }

  return (
    <div>
      <Nav handleSubmit={handleSubmit} />
      <div className="items-center justify-center h-screen max-w-screen-lg m-7">
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="flex items-center justify-center ">
              <div className="w-40 h-40 border-t-4 border-b-4 border-green-900 rounded-full animate-spin"></div>
            </div>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {renderImages}
            </div>
          </div>
        )}
      </div>
      <Modal show={modal.show} url={modal.url} handleClick={closeModal} />
    </div>
  );
}

export default App;
