import idb from 'idb';

const dbPromise = {
  db: idb.open('restaurant-reviews-db', 1, function(upgradeDB) {
    switch (upgradeDB.oldVersion) {
      case 0:
        upgradeDB.createObjectStore('restaurants', { keyPath: 'id'});
    }
  }),

  putRestaurants(restaurants) {
    if (!restaurants.push) restaurants = [restaurants];
    return this.db.then(db => {
      const store = db.transaction('restaurants', 'readwrite').objectStore('restaurants');
      Promise.all(restaurants.map(networkRestaurant => {
        return store.get(networkRestaurant.id).then(idbRestaurant => {
          if (!idbRestaurant || networkRestaurant.updatedAt > idbRestaurant.updatedAt) {
            return store.put(networkRestaurant);
          }
        });
      })).then(function () {
        return store.complete;
      });
    });
  }, 

// get restaurant, by its id, or all stored restaurantsin idb using promises.
  // if no argument is pased, all restaurants wil be retuened.

  getRestaurants(id = undefined) {
    return this.db.then(db => {
      const store = db.transaction('restaurant').objectStore('restaurants');
      if (id) return store.get(Number(id));
      return store.getAll();
    })
  }

}

export default dbPromise;
