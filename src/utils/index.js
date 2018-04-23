import chalk from "chalk";
import feedparser from "feedparser-promised";
import fetchFavicon from "@meltwater/fetch-favicon";
import trunc from "trunc-html";

const url = "http://slashdot.org/slashdot.rss";
// const url = "https://feeds.feedburner.com/d0od";
// const url = "http://github.com";

const stripTags = (html, tags) => {
  return trunc(html, 10000, { ignoreTags: tags }).html;
};

const textOnly = html => {
  return stripTags(html, ["img", "a"]);
};
const stripImg = html => {
  return stripTags(html, ["img"]);
};
export class Post {
  constructor(post) {
    this.author = post.author;
    this.categories = post.categories;
    this.comments = post.comments;
    this.date = post.date;
    this.description = post.description;
    this.enclosures = post.enclosures;
    this.guid = post.guid;
    this.image = post.image;
    this.title = post.title;
    this.summary = post.summary;
    this.link = post.link;
    this.meta = {
      categories: post.meta.categories,
      description: post.meta.description,
      language: post.meta.language,
      link: post.meta.link,
      title: post.meta.title
    };
  }
}

export class Feed {
  constructor(url) {
    this.url = url;
    this.favicon = null;
    this.error = null;
    this.posts = [];
  }
  async fetchFavicon() {
    this.favicon = await fetchFavicon(url);
  }
  async fetchPosts() {
    await feedparser
      .parse(this.url)
      .then(items => {
        items.map(i => {
          console.log("i", i);
          this.posts.push(new Post(i));
        });
      })
      .catch(err => {
        console.log(chalk.red("error", err.message));
        this.error = err.message;
      });
  }
  numberOfPosts() {
    try {
      return this.posts.length;
    } catch (err) {
      console.log("err", err);
      return "";
    }
  }
}

let test = new Promise(async (resolve, reject) => {
  let newFeed = new Feed(url);
  await newFeed.fetchFavicon();
  console.log("this.favicon", newFeed.favicon);
  await newFeed.fetchPosts();
  console.log("newFeed.numberOfPosts()", newFeed.numberOfPosts());
  console.log("done");
  console.log("newFeed.posts[0].summary", newFeed.posts[0].summary);
  console.log("--------------------------------------------------");
  console.log(
    "newFeed.posts[0].summaryNoImg()",
    textOnly(newFeed.posts[0].description)
  );
  resolve("ok");
});

test
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });
