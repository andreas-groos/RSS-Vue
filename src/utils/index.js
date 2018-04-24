import chalk from "chalk";
import feedparser from "feedparser-promised";
import favicon from "favicon";
import trunc from "trunc-html";
import oust from "oust";

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
    this.extractedImages = null;
  }
  extractImg() {
    let images = oust(this.description, "images");
    images = images.filter(i => {
      // TODO: need to filter out twitter icons etc
      if (!i.match(/netlify|cloudinary/g)) {
        return true;
      } else {
        return false;
      }
    });
    this.extractedImages = images;
  }
}

export class Feed {
  constructor(url) {
    this.url = url;
    this.favicon = null;
    this.error = null;
    this.posts = [];
  }
  async getFavicon() {
    let icon = await favicon(this.url, (err, iconUrl) => {
      if (err) {
        console.log("err", err);
      }
      this.favicon = iconUrl;
    });
  }
  async fetchPosts() {
    await feedparser
      .parse(this.url)
      .then(items => {
        items.map(i => {
          this.posts.push(new Post(i));
        });
        if (items.length === 0) {
          this.error = "could not get posts in feed";
        }
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
