export const findHighestQualification = (qualifications) => {
  const highest = qualifications.reduce((max, curr) => {
    if (curr.passingYear > max) {
      max = curr.passingYear;
      // console.log(max);
    }
    return max;
  }, 0);

  const highestDegree = qualifications.filter(
    (qual) => qual.passingYear === highest
  );

  return highestDegree[0].degree;
};
