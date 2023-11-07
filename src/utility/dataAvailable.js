const dataAvailable = (dbData, res) => {
  if (!dbData || dbData.length === 0) {
    res.status(204).send({ message: "not data found" });
    return false;
  } else {
    return true;
  }
};
module.exports = dataAvailable;
