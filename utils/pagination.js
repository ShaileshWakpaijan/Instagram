const pagination = (page, limit, allcontent) => {
  let startIndex = (page - 1) * limit;
  let endIndex = page * limit;

  let isNext;
  let isPrevious;

  if (endIndex < allcontent.length) {
    isNext = true;
  } else {
    isNext = false;
  }

  if (startIndex > 0) {
    isPrevious = true;
  } else {
    isPrevious = false;
  }

  return { startIndex, endIndex, isNext, isPrevious };
};

module.exports = pagination;
