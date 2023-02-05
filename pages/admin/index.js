import styles from "../../styles/Admin.module.css";
import Image from "next/image";

import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import PageTitle from "../../Components/PageTitle";
import ModalGenre from "../../Components/ModalGenre";
import ModalCast from "../../Components/ModalCast";

// import poster from "../../assets/poster1.png";
import defaultImg from "../../assets/avatar.webp";
import location from "../../assets/location.png";
import chevron from "../../assets/chevron.png";
import ebv from "../../assets/ebv.png";
import hiflix from "../../assets/hiflix.png";
import cineone from "../../assets/cineone.png";
import calendar from "../../assets/calendar.png";
import plus from "../../assets/plus.png";
import chart from "../../assets/chart.png";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moviesActions from "../../redux/actions/movies";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function Admin() {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.userData.token);
  const locationData = useSelector((state) => state.movie.location);
  const listLocation = useSelector((state) => state.movie.list);
  const [movieName, setMovieName] = useState("");
  const [director, setDirector] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState([]);
  const [casts, setCasts] = useState([]);
  const [castsId, setCastsId] = useState([]);
  const [image, setImage] = useState("");
  const [imgPrev, setImgPrev] = useState(null);
  // const [movieLocation, setMovieLocation] = useState("");
  // const [listByLocation, setlistByLocation] = useState([
  //   "134f54fd-4372-4030-9071-5036a32c9b2e",
  //   "bcf956ae-11f6-4292-9daf-6219ed586f21",
  //   "8c7b859d-9d8f-4cab-a945-26ca6bf52df5",
  // ]);
  // const [listBySchedule, setlistByLocation] = useState([
  // const [listBy, setlistByLocation] = useState([
  //   "134f54fd-4372-4030-9071-5036a32c9b2e",
  //   "bcf956ae-11f6-4292-9daf-6219ed586f21",
  //   "8c7b859d-9d8f-4cab-a945-26ca6bf52df5",
  // ]);

  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);

  const inputFileRef = React.createRef();

  const link = process.env.NEXT_PUBLIC_CLOUDINARY_LINK;

  console.log(locationData);

  const inputImage = () => {
    inputFileRef.current.click();
  };

  const imageHandler = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImgPrev(URL.createObjectURL(file));
  };

  const addRemoveCategory = (inputCategory, inputCategoryid) => {
    const arrCategory = category;
    const arrCategoryId = categoryId;
    const index1 = arrCategory.indexOf(inputCategory);
    const index2 = arrCategoryId.indexOf(inputCategoryid);
    if (index1 > -1) {
      arrCategory.splice(index1, 1);
    } else {
      arrCategory.push(inputCategory);
    }
    if (index2 > -1) {
      arrCategoryId.splice(index2, 1);
    } else {
      arrCategoryId.push(inputCategoryid);
    }
    setCategory([...arrCategory]);
    setCategoryId([...arrCategoryId]);
  };

  const addRemoveCasts = (inputCast, inputCastsid) => {
    const arrCast = casts;
    const arrCastId = castsId;
    const index1 = arrCast.indexOf(inputCast);
    const index2 = arrCastId.indexOf(inputCastsid);
    if (index1 > -1) {
      arrCast.splice(index1, 1);
    } else {
      arrCast.push(inputCast);
    }
    if (index2 > -1) {
      arrCastId.splice(index2, 1);
    } else {
      arrCastId.push(inputCastsid);
    }
    setCasts([...arrCast]);
    setCastsId([...arrCastId]);
  };

  // console.log(image);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(
      movieName,
      director,
      synopsis,
      releaseDate,
      duration,
      image,
      categoryId,
      castsId
    );

    const listLocation = `["134f54fd-4372-4030-9071-5036a32c9b2e","bcf956ae-11f6-4292-9daf-6219ed586f21","8c7b859d-9d8f-4cab-a945-26ca6bf52df5"]`;

    const listSchedule = `["2e99aeca-ecbb-4ec7-8888-609c85fa8449","5ecd18c5-c06d-4a63-be61-a4e6e080f0da","d3f4b282-d773-4e05-8b70-7b5770784efb","800ccf06-6234-4b98-9b1c-235f213b42d9","d62247a1-4a2a-47a9-847c-d446b72e937e"]`;

    const showDate = "2022-12-06";

    const body = new FormData();
    body.append("movieName", movieName);
    body.append("synopsis", synopsis);
    body.append("releaseDate", releaseDate);
    body.append("showDate", showDate);
    body.append("duration", duration);
    body.append("director", director);
    body.append("image", image);
    body.append("genreId", JSON.stringify(categoryId));
    body.append("castIds", JSON.stringify(castsId));
    body.append("cinemasLocationsId", listLocation);
    body.append("schedulesId", listSchedule);
    // console.log(body);
    dispatch(
      moviesActions.createMovieThunk(token, body, createSuccess, createError)
    );
  };

  const createSuccess = () => {
    toast.success("Congrats!, Movie created successfully");
    router.push("/");
  };

  const createError = (error) => toast.error(`${error}`);

  const changeLocation = (e) => {
    setMovieLocation(e.target.id);
  };

  useEffect(() => {
    dispatch(moviesActions.getLocationThunk());
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(moviesActions.getListThunk(`/api/cinema/list/${movieLocation}`));
  // }, [movieLocation]);
  return (
    <main>
      <PageTitle title={"Create Movie"} />
      <ModalGenre
        open={open}
        setOpen={setOpen}
        // category={category}
        // categoryId={categoryId}
        // setCategory={setCategory}
        addRemoveCategory={addRemoveCategory}
      />
      <ModalCast
        open={modal}
        setOpen={setModal}
        // category={category}
        // categoryId={categoryId}
        // setCategory={setCategory}
        addRemoveCasts={addRemoveCasts}
      />
      <Header />
      <section className={styles["section-main"]}>
        <section className={styles["section-1"]}>
          <aside className={styles["aside-left"]}>
            <h1 className={styles["desc-header-1"]}>Movie Description</h1>
            <div className={styles["desc-div"]}>
              <div className={styles["desc-div-1"]}>
                <aside className={styles["desc-aside-left"]}>
                  <div className={styles["desc-div-2"]}>
                    {!image ? (
                      <Image
                        className={styles["decs-img-1"]}
                        src={defaultImg}
                        onClick={inputImage}
                        width={177}
                        height={272}
                      />
                    ) : (
                      <Image
                        className={styles["decs-img-1"]}
                        src={imgPrev || `${link}/${image}` || defaultImg}
                        // alt="img"
                        onClick={inputImage}
                        width={177}
                        height={272}
                      />
                    )}

                    <input
                      type="file"
                      name="image"
                      hidden={true}
                      ref={inputFileRef}
                      onChange={(e) => imageHandler(e)}
                    />
                  </div>
                  <div className={styles["desc-div-6"]}>
                    <p className={styles["desc-label-1"]}>Director</p>
                    <input
                      className={styles["desc-input-2"]}
                      type="text"
                      value={director}
                      placeholder="Input director"
                      onChange={(e) => setDirector(e.target.value)}
                    />
                  </div>
                </aside>
                <aside className={styles["desc-aside-right"]}>
                  <p className={styles["desc-label-1"]}>Movie Name</p>
                  <input
                    className={styles["desc-input-1"]}
                    type="text"
                    value={movieName}
                    placeholder="Input movie name"
                    onChange={(e) => setMovieName(e.target.value)}
                  />
                  <p className={styles["desc-label-1"]}>Category</p>
                  {/* <select name="" id="">
                    <option value="0" selected></option>
                    <option value="1">Sci-fi</option>
                    <option value="2">Fantasy</option>
                    <option value="3">Action</option>
                    <option value="4">Horror</option>
                    <option value="5">Romance</option>
                    <option value="9">Drama</option>
                    <option value="10">Comedy</option>
                  </select> */}
                  <input
                    className={styles["desc-input-1"]}
                    type="text"
                    value={category}
                    placeholder="Input category"
                  />
                  <button
                    className={styles["add-genre-btn"]}
                    onClick={() => setOpen(true)}
                  >
                    add genres
                  </button>
                  <div className={styles["desc-div-3"]}>
                    <div className={styles["desc-div-5"]}>
                      <p className={styles["desc-label-1"]}>Release date</p>
                      <input
                        className={styles["desc-input-2"]}
                        type="date"
                        value={releaseDate}
                        onChange={(e) => setReleaseDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <p className={styles["desc-label-1"]}>
                        Duration (minutes)
                      </p>
                      <div className={styles["desc-div-4"]}>
                        <input
                          className={styles["desc-input-3"]}
                          type="text"
                          value={duration}
                          placeholder="0"
                          onChange={(e) => setDuration(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <p className={styles["desc-label-1"]}>Casts</p>
                  <input
                    className={styles["desc-input-2"]}
                    type="text"
                    placeholder="Input casts"
                    value={casts}
                  />
                  <button
                    className={styles["add-cast-btn"]}
                    onClick={() => setModal(true)}
                  >
                    add casts
                  </button>
                </aside>
              </div>
              <button className={styles["desc-btn-1"]}>Add description</button>
              <div className={styles["desc-div-7"]}>
                <p className={styles["desc-label-1"]}>Synopsis</p>
                <input
                  className={styles["desc-input-4"]}
                  type="text"
                  value={synopsis}
                  placeholder="Input description"
                  onChange={(e) => setSynopsis(e.target.value)}
                />
              </div>
              <div className={styles["btn-submit"]}>
                <button className={styles["create-btn"]} onClick={onSubmit}>
                  Create Movies
                </button>
              </div>
            </div>
          </aside>
          <aside className={styles["aside-right"]}>
            <h1 className={styles["desc-header-1"]}>Premiere Location</h1>
            <div className={styles["location-div"]}>
              <div className={styles["location-div-1"]}>
                <Image className={styles[""]} src={location} alt="img" />
                <p className={styles["location-text-1"]}>Purwokerto</p>
                <select name="" id="">
                  <option value="0" selected>
                    Input Location
                  </option>
                  {locationData.map((e) => {
                    return (
                      <option
                        value={e.location}
                        id={e.location_id}
                        onClick={changeLocation}
                      >
                        {e.location}
                      </option>
                    );
                  })}
                </select>
                <Image
                  className={styles["location-img-1"]}
                  src={chevron}
                  alt="img"
                />
              </div>
              <div className={styles["location-div-3"]}>
                <div className={styles["location-div-2"]}>
                  <Image
                    className={styles["location-img-2"]}
                    src={ebv}
                    alt="img"
                  />
                  <Image
                    className={styles["location-img-2"]}
                    src={hiflix}
                    alt="img"
                  />
                  <Image
                    className={styles["location-img-2"]}
                    src={cineone}
                    alt="img"
                  />
                </div>
                <div className={styles["location-div-2"]}>
                  <Image
                    className={styles["location-img-2"]}
                    src={ebv}
                    alt="img"
                  />
                  <Image
                    className={styles["location-img-2"]}
                    src={hiflix}
                    alt="img"
                  />
                  <Image
                    className={styles["location-img-2"]}
                    src={cineone}
                    alt="img"
                  />
                </div>
                <div className={styles["location-div-2"]}>
                  <Image
                    className={styles["location-img-2"]}
                    src={ebv}
                    alt="img"
                  />
                  <Image
                    className={styles["location-img-2"]}
                    src={hiflix}
                    alt="img"
                  />
                  <Image
                    className={styles["location-img-2"]}
                    src={cineone}
                    alt="img"
                  />
                </div>
              </div>
            </div>
            <h1 className={styles["desc-header-1"]}>Showtimes</h1>
            <div className={styles["showtime-div"]}>
              <div className={styles["showtime-div-1"]}>
                <Image className={styles[""]} src={calendar} alt="img" />
                <p className={styles["showtime-text-1"]}>Set a date</p>
                <Image
                  className={styles["showtime-img-1"]}
                  src={chevron}
                  alt="img"
                />
              </div>
              <button className={styles["showtime-btn-1"]}>
                <Image className={styles[""]} src={plus} alt="img" />
              </button>
            </div>
          </aside>
        </section>
        <section className={styles["section-2"]}>
          <h1 className={styles["desc-header-1"]}>Premiere Location</h1>
          <div className={styles["chart-div"]}>
            <div className={styles["chart-div-1"]}>
              <div className={styles["chart-div-2"]}>Based on Movie</div>
              <div className={styles["chart-div-3"]}>Based on Location</div>
            </div>
            <div className={styles["chart-div-4"]}>
              <div>
                <Image
                  className={styles["chart-img-1"]}
                  src={chart}
                  alt="img"
                />
                <Image
                  className={styles["chart-img-1"]}
                  src={chart}
                  alt="img"
                />
                <Image
                  className={styles["chart-img-1"]}
                  src={chart}
                  alt="img"
                />
              </div>
              <div>
                <Image
                  className={styles["chart-img-1"]}
                  src={chart}
                  alt="img"
                />
                <Image
                  className={styles["chart-img-1"]}
                  src={chart}
                  alt="img"
                />
                <Image
                  className={styles["chart-img-1"]}
                  src={chart}
                  alt="img"
                />
              </div>
              <div className={styles["chart-div-6"]}>
                <div className={styles["chart-div-5"]}>1</div>
                <div className={styles["chart-div-7"]}>2</div>
                <div className={styles["chart-div-7"]}>3</div>
                <div className={styles["chart-div-7"]}>4</div>
              </div>
              <div className={styles["view-div"]}>
                <div className={styles["view-line"]}></div>
                <div className={styles["view-text-1"]}>view more</div>
                <div className={styles["view-line"]}></div>
              </div>
            </div>
          </div>
        </section>
      </section>
      <Footer />
    </main>
  );
}
