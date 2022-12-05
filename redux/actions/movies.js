import { ActionType } from "redux-promise-middleware";
import { ACTION_STRING } from "./actionStrings";
import {
  getMovieUpcoming,
  getMovieShowing,
  getMovieDetails,
  createMovies,
} from "../../modules/api/movies";

const { Pending, Rejected, Fulfilled } = ActionType;

const getUpcomingPending = () => ({
  type: ACTION_STRING.getUpcoming.concat("_", Pending),
});

const getUpcomingRejected = (error) => ({
  type: ACTION_STRING.getUpcoming.concat("_", Rejected),
  payload: { error },
});

const getUpcomingFulfilled = (data) => ({
  type: ACTION_STRING.getUpcoming.concat("_", Fulfilled),
  payload: { data },
});

const getShowingPending = () => ({
  type: ACTION_STRING.getShowing.concat("_", Pending),
});

const getShowingRejected = (error) => ({
  type: ACTION_STRING.getShowing.concat("_", Rejected),
  payload: { error },
});

const getShowingFulfilled = (data) => ({
  type: ACTION_STRING.getShowing.concat("_", Fulfilled),
  payload: { data },
});

const getDetailsPending = () => ({
  type: ACTION_STRING.getDetails.concat("_", Pending),
});

const getDetailsRejected = (error) => ({
  type: ACTION_STRING.getDetails.concat("_", Rejected),
  payload: { error },
});

const getDetailsFulfilled = (data) => ({
  type: ACTION_STRING.getDetails.concat("_", Fulfilled),
  payload: { data },
});

const createMoviePending = () => ({
  type: ACTION_STRING.createMovie.concat("_", Pending),
});

const createMovieRejected = (error) => ({
  type: ACTION_STRING.createMovie.concat("_", Rejected),
  payload: { error },
});

const createMovieFulfilled = (data) => ({
  type: ACTION_STRING.createMovie.concat("_", Fulfilled),
  payload: { data },
});

const getUpcomingThunk = (params) => {
  return async (dispatch) => {
    try {
      dispatch(getUpcomingPending());
      const result = await getMovieUpcoming(params);
      dispatch(getUpcomingFulfilled(result.data));
    } catch (error) {
      dispatch(getUpcomingRejected(error));
    }
  };
};

const getShowingThunk = (params) => {
  return async (dispatch) => {
    try {
      dispatch(getShowingPending());
      const result = await getMovieShowing(params);
      dispatch(getShowingFulfilled(result.data));
    } catch (error) {
      dispatch(getShowingRejected(error));
    }
  };
};

const getDetailsThunk = (params, token) => {
  return async (dispatch) => {
    try {
      dispatch(getDetailsPending());
      const result = await getMovieDetails(token, params);
      dispatch(getDetailsFulfilled(result.data));
    } catch (error) {
      dispatch(getDetailsRejected(error));
    }
  };
};

const createMovieThunk = (data, token) => {
  return async (dispatch) => {
    try {
      dispatch(createMoviePending());
      const result = await createMovies(data, token);
      dispatch(createMovieFulfilled(result.data));
    } catch (error) {
      dispatch(createMovieRejected(error));
    }
  };
};

const moviesActions = {
  getUpcomingThunk,
  getShowingThunk,
  getDetailsThunk,
  createMovieThunk,
};

export default moviesActions;
