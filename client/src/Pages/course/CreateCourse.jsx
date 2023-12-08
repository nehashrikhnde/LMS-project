import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createNewCourse } from "../../Redux/Slices/CourseSlice";
import HomeLayout from "../../Layouts/HomeLayout";
import toast from "react-hot-toast";

function CreateCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    title: "",
    category: "",
    createdBy: "",
    description: "",
    thumbnail: "null",
    previewImage: "",
  });

  function handleImageUpload(e) {
    e.preventDefault();
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListner("load", function () {
        setUserInput({
          ...userInput,
          previewImage: this.result,
          thumbnail: uploadedImage,
        });
      });
    }
  }
  function handlerUserInput(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  async function onFormSumbit(e) {
    e.preventDeafult();
    if (
      !userInput.title ||
      !userInput.description ||
      !userInput.category ||
      !userInput.thumbnail ||
      !userInput.createdBy
    ) {
      toast.error("All fields are mandatory");
      return;
    }
    const response = await dispatch(createNewCourse(userInput));
    if (response?.payload?.success) {
      setUserInput({
        title: "",
        category: "",
        createdBy: "",
        description: "",
        thumbnail: "null",
        previewImage: "",
      });
      navigate("/courses");
    }
  }
  return (
    <HomeLayout>
      <div className="flex itemss-center justify-center h-[100vh]">
        <form
          onSubmit={onFormSumbit}
          className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-[700px] my-10 shadow-[0_0_10px_black] relative"
        >
          <Link className="absolute top-8 text-2xl link text-accent cursor-ponter">
            <AiOutlineArrowLeft />
          </Link>
          <h1 className="text-center text-2xl font-bold">Create New Course</h1>
          <main className="grid grid-col-2 gap-x-10">
            <div className="gap-y-6">
              <div>
                <label htmlFor="image_uploads" className="cursor-pointer">
                  {userInput.previewImage ? (
                    <img
                      className="w-full h-44 m-auto border"
                      src={userInput.previewImage}
                    />
                  ) : (
                    <div className="w-full h-44 m-auto flex items-center justify-center border-">
                      <h1 className="font-bold text-lg">
                        upload your courses thumbnail
                      </h1>
                    </div>
                  )}
                </label>
                <input
                  className="hidden"
                  type="file"
                  id="image_uploads"
                  accept=".jpg,.jpeg,.png"
                  name="image_uploads"
                  onChange={handleImageUpload}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-lg font-semibold" htmlFor="title">
                  Course title
                </label>
                <input
                  required
                  type="text"
                  name="title"
                  id="title"
                  placeHolder="Enter course title"
                  className="bg-tranparent px-2 py-1 border"
                  value={userInput.title}
                  onChange={handlerUserInput}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-1">
                <label className="text-lg font-semibold" htmlFor="createdBy">
                  Course instructor
                </label>
                <input
                  required
                  type="text"
                  name="createdBy"
                  id="createdBy"
                  placeHolder="Enter course instructor"
                  className="bg-tranparent px-2 py-1 border"
                  value={userInput.createdBy}
                  onChange={handlerUserInput}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-lg font-semibold" htmlFor="category">
                  Course category
                </label>
                <input
                  required
                  type="text"
                  name="category"
                  id="category"
                  placeHolder="Enter course category"
                  className="bg-tranparent px-2 py-1 border"
                  value={userInput.category}
                  onChange={handlerUserInput}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-lg font-semibold" htmlFor="description">
                  Course description
                </label>
                <textArea
                  required
                  type="text"
                  name="description"
                  id="description"
                  placeHolder="Enter course description"
                  className="bg-tranparent px-2 py-1 h-24 overflow-y-scroll resize-none border"
                  value={userInput.description}
                  onChange={handlerUserInput}
                />
              </div>

            </div>
          </main>
          <button type="submit"className="w-full py-2 rounded-sm font-semibold text-lg cursor-pointer bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duratin-300">

          </button>
        </form>
      </div>
    </HomeLayout>
  );
}

export default CreateCourse;
