export const showError = (error) => {
  alert(`Произошла ошибка загрузки данных ${error.message}`);
};

export const findById = (array, id) => {
  return array.find((element) => element.id === id);
};
