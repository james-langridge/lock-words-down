export const shuffle = (array: any[]) =>
[...Array(array.length)]
  .map((...args) => Math.floor(Math.random() * (args[1] + 1)))
  .reduce( (a, rv, i) => ([a[i], a[rv]] = [a[rv], a[i]]) && a, array);

  export const findByTestAttr = (component: any, attr: any) => {
    const wrapper = component.find(`[data-test='${attr}']`);
    return wrapper;
}
