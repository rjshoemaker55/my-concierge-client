export const loadResults = (data) => {
  return new Promise((resolve, reject) => {
    const { destCity, arriveDate, numberNights, sortBy } = data;

    const getLocationId = async () => {
      await fetch(`/locationid/${destCity}`).then((res) =>
        res.json().then((data) => {
          if (data.error) {
            reject({ msg: 'Invalid location.', type: 'location' });
          } else {
            getHotelList(data);
          }
        })
      );
    };

    const getHotelList = async (locationId) => {
      await fetch(
        `/hotellist/${locationId}/${arriveDate}/${numberNights}/${sortBy}`
      )
        .then((res) => {
          return res.json();
        })
        .then((parsedHotelList) => resolve(parsedHotelList));
    };

    getLocationId(destCity);
  });
};
