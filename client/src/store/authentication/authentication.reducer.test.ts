import authenticationReducer from "./authentication.reducers";

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
};

const user = {
  name: "Alice",
};

describe("Authentication Reducer", () => {
  it("Should return default state", () => {
    const newState = authenticationReducer(undefined, {
      type: "",
      payload: "",
    });
    expect(newState).toEqual(initialState);
  });

  it("Should return new state with current user set", () => {
    const newState = authenticationReducer(undefined, {
      type: "auth/setCurrentUser",
      payload: user,
    });
    expect(newState).toEqual({
      isAuthenticated: true,
      user: user,
      loading: false,
    });
  });

  it("Should return new state with loading set to true", () => {
    const newState = authenticationReducer(undefined, {
      type: "auth/userLoading",
    });
    expect(newState).toEqual({
      isAuthenticated: false,
      user: {},
      loading: true,
    });
  });
});
