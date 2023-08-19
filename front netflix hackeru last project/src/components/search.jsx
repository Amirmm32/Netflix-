import { useSearchParams } from "react-router-dom";
import React, { useState, useEffect, useRef  } from "react";
import Movie from "./movie";
export default function Search() {

    const [filteredVideos, setFilteredVideos] = useState([]);
    let [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const fetchData = async () => {
            const filter = searchParams.get("filter");
            try {
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                const requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    credentials: 'include',
                    redirect: 'follow',
                };

                let response;
                if (!filter) {
                    response = await fetch(`http://localhost:5000/api/movies/`, requestOptions);
                } else {
                    response = await fetch(`http://localhost:5000/api/movies/search?seriesTitle=${filter}`, requestOptions);
                }

                const data = await response.json();
                if (!response.ok) throw new Error(`${data.message} (${response.status})`);
                setFilteredVideos(data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [searchParams]);

  return (
    <section>
      <form id={`search-items`} role="search">
        <input type="search"
          className="form-control"
           value={searchParams.get("filter") || ""}
           onChange={(event) => {
               let filter = event.target.value;
               setSearchParams(filter ? { filter } : {});
           }}
        />
      </form>
        <section id="mylist" className="container ">
            <div className="mylist-container d-flex flex-start flex-middle flex-no-wrap owl-carousel">
          {filteredVideos
              .map((video, index) => (
                  <Movie video={video} index={index} />
              ))}
            </div>
        </section>
    </section>
  );
}
