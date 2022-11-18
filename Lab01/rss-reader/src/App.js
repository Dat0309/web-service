import React, { useState } from "react";

export default function App() {

  const [rssUrl, setRssUrl] = useState("");
  const [items, setItems] = useState([]);

  const getRss = async (e) => {
    e.preventDefault();
    // const urlRegex = new RegExp('/(http|ftp|https)://[w-]+(.[w-]+)+([w.,@?^=%& amp;:/~+#-]*[[email protected]?^=%&amp;/~+#-])?/');
    // if (!urlRegex.test(rssUrl)) {
    //   return;
    // }

    const res = await fetch(`https://api.allorigins.win/get?url=${rssUrl}`);
    const { contents } = await res.json();
    const feed = new window.DOMParser().parseFromString(contents, "text/xml");
    const items = feed.querySelectorAll("item");
    console.log(items);
    const feedItems = [...items].map((el) => ({
      link: el.querySelector("link").innerHTML,
      title: el.querySelector("title").innerHTML,
      description: el.querySelector("description").innerHTML?? "",
      pubDate: el.querySelector("pubDate").innerHTML?? ""
    }));

    console.log(feedItems);

    setItems(feedItems);
  };

  return (
    <div className="App">
      <form id="content" onSubmit={getRss}>
        <div>
          <label>rss url</label>
          <br />
          <input className="input" id="search-input" onChange={(e) => setRssUrl(e.target.value)} value={rssUrl} />
        </div>
        <input className="search" id="search-btn" type="submit" />
      </form>
      {items.map((item) => {
        return (
          <div>
            <h1>{item.title}</h1>
            <p>{item.author}</p>
            <a href={item.link}>{item.link}</a>
            <p>{item.description}</p>
            <p>{item.postDate}</p>
            <p>{item.pubDate}</p>
          </div>
        );
      })}
    </div>
  );
}