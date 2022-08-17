
    //  Add a marker to the map for every store listing.

        function addMarkers() {
          /* For each feature in the GeoJSON object above: */
          for (const marker of data) {
            /* Create a div element for the marker. */
            const el = document.createElement("div");
            /* Assign a unique `id` to the marker. */
            el.id = `marker-${marker.properties.id}`;
            /* Assign the `marker` class to each marker for styling. */
            el.className = "marker";

            /**
             * Create a marker using the div element
             * defined above and add it to the map.
             **/
            new mapboxgl.Marker(el, { offset: [0, -30] })
              .setLngLat(marker.geometry.coordinates)
              .addTo(map);

            /**
             * Listen to the element and when it is clicked, do three things:
             * 1. Fly to the point
             * 2. Close all other popups and display popup for clicked store
             * 3. Highlight listing in sidebar (and remove highlight for all other listings)
             **/
            el.addEventListener("click", (e) => {
              /* Fly to the point */
              flyToStore(marker);
              /* Close all other popups and display popup for clicked store */
              createPopUp(marker);
              /* Highlight listing in sidebar */
              const activeItem = document.getElementsByClassName("active");
              e.stopPropagation();
              if (activeItem[0]) {
                activeItem[0].classList.remove("active");
              }
              const listing = document.getElementById(
                `listing-${marker.properties.id}`
              );
              listing.classList.add("active");
            });
          }
        }

    
       // Add a listing for each store to the sidebar.


        function buildLocationList(data) {
          for (const point of data) {
            /* Add a new listing section to the sidebar. */
            const listings = document.getElementById("listings");
            const listing = listings.appendChild(document.createElement("div"));
            /* Assign a unique `id` to the listing. */
            listing.id = `listing-${point.properties.id}`;
            /* Assign the `item` class to each listing for styling. */
            listing.className = "item";

            /* Add the link to the individual listing created above. */
            const link = listing.appendChild(document.createElement("a"));
            link.href = "#";
            link.className = "title";
            link.id = `link-${point.properties.id}`;
            link.innerHTML = `${point.properties.country}`;

            /* Add details to the individual listing. */
            const details = listing.appendChild(document.createElement("div"));
            //  details.innerHTML = `${point.properties.province}`;
            if (point.properties.province) {
              details.innerHTML += `${point.properties.province}`;
            }

            /**
             * Listen to the element and when it is clicked, do four things:
             * 1. Update the `currentFeature` to the store associated with the clicked link
             * 2. Fly to the point
             * 3. Close all other popups and display popup for clicked store
             * 4. Highlight listing in sidebar (and remove highlight for all other listings)
             **/
            link.addEventListener("click", function () {
              for (const point of data) {
                if (this.id === `link-${point.properties.id}`) {
                  flyToStore(point);
                  createPopUp(point);
                }
              }
              const activeItem = document.getElementsByClassName("active");
              if (activeItem[0]) {
                activeItem[0].classList.remove("active");
              }
              this.parentNode.classList.add("active");
            });
          }
        }





      





          /**
       * Assign a unique id to each store. You'll use this `id`
       * later to associate each point on the map with a listing
       * in the sidebar.
       */

      data.forEach((point, i) => {
        point.properties.id = i;
      });

      // Holds visible airport features for filtering
      let points = [];

      // Create a popup, but don't add it to the map yet.
      const popup = new mapboxgl.Popup({
        closeButton: false,
        className: "popup",
      });

      const filterEl = document.getElementById("feature-filter");
      const listingEl = document.getElementById("feature-listing");

      function renderListings(features) {
        const empty = document.createElement("p");
        // Clear any existing listings
        listingEl.innerHTML = "";
        if (features.length) {
          for (const feature of features) {
            const label = `${feature.properties.province},
             ${feature.properties.country}`;

            // itemLink.href = feature.properties.wikipedia;
            // itemLink.target = '_blank';
            // itemLink.textContent = label;

            /* Add the link to the individual listing created above. */
            const itemLink = listingEl.appendChild(document.createElement("a"));
            itemLink.href = "#";
            itemLink.className = "";
            itemLink.id = `link-${feature.properties.id}`;
            itemLink.innerHTML = `${feature.properties.province}, ${feature.properties.country}`;

            /* Add details to the individual listing. */
            // const details = listingEl.appendChild(
            //   document.createElement("div")
            // );
            //  details.innerHTML = `${point.properties.province}`;
            // if (feature.properties.province) {
            //   details.innerHTML += `${feature.properties.country}`;
            // }

            itemLink.addEventListener("click", function () {
              for (const feature of features) {
                if (this.id === `link-${feature.properties.id}`) {
                  flyToStore(feature);
                  createPopUp(feature);
                }
              }
              const activeItem = document.getElementsByClassName("active");
              if (activeItem[0]) {
                activeItem[0].classList.remove("active");
              }
              this.parentNode.classList.add("active");
            });

            function flyToStore(currentFeature) {
              map.flyTo({
                center: currentFeature.geometry.coordinates,
                zoom: 5,
              });
            }


     
            // map.on("mousemove", "Cases", (e) => {
            //     const feature = e.features[0];
            //     /* Highlight listing in sidebar */
            //     const activeItem = document.getElementsByClassName("active");

            //     if (activeItem[0]) {
            //       activeItem[0].classList.remove("active");
            //     }
            //     const listing = document.getElementById(
            //       `listing-${feature.properties.id}`
            //     );
            //     listing.classList.add("active");
            //   });

            itemLink.addEventListener("mouseover", () => {
              // Highlight corresponding feature on the map
              popup
                .setLngLat(feature.geometry.coordinates)
                .setText(label)
                .addTo(map);
            });
            listingEl.appendChild(itemLink);
          }

          // Show the filter input
          filterEl.parentNode.style.display = "block";
        } else if (features.length === 0 && filterEl.value !== "") {
          empty.textContent = "No results found";
          listingEl.appendChild(empty);
        } else {
          empty.textContent = "Drag the map to populate results";
          listingEl.appendChild(empty);

          // Hide the filter input
          filterEl.parentNode.style.display = "none";

          // remove features filter
          map.setFilter("Cases", ["has", "id"]);
        }
      }

      function normalize(string) {
        return string.trim().toLowerCase();
      }

      // Because features come from tiled vector data,
      // feature geometries may be split
      // or duplicated across tile boundaries.
      // As a result, features may appear
      // multiple times in query results.
      function getUniqueFeatures(features, comparatorProperty) {
        const uniqueIds = new Set();
        const uniqueFeatures = [];
        for (const feature of features) {
          const id = feature.properties[comparatorProperty];
          if (!uniqueIds.has(id)) {
            uniqueIds.add(id);
            uniqueFeatures.push(feature);
          }
        }
        return uniqueFeatures;
      }
