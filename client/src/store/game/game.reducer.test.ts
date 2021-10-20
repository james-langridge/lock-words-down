import gameReducer from "./game.reducers";

describe("Game Reducer", () => {
  it("Should return new state with game title set", () => {
    const newState = gameReducer(undefined, {
      type: "game/setGameTitle",
      payload: "Cool Game",
    });
    expect(newState).toEqual({
      gameTitle: "Cool Game",
      enableScrolling: "false",
    });
  });

  it("Should return new state with scrolling enabled", () => {
    const newState = gameReducer(undefined, {
      type: "game/toggleScrolling",
    });
    expect(newState).toEqual({
      gameTitle: "",
      enableScrolling: "true",
    });
  });
});
