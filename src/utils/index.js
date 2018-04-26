import chalk from "chalk";
import feedparser from "feedparser-promised";
import favicon from "favicon";
import trunc from "trunc-html";
import oust from "oust";

export const stripTags = (html, chars, tags) => {
  return trunc(html, chars, { ignoreTags: tags }).html;
};

export const textOnly = (html, chars) => {
  return stripTags(html, chars, [("img", "a")]);
};
export const stripImg = (html, chars) => {
  return stripTags(html, chars, ["img"]);
};
export class Post {
  constructor(post, index) {
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
    this.shortSummary = textOnly(post.summary, 200);
    this.link = post.link;
    this.index = index;
    this.read = false;
    this.starred = false;
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
    images = images.filter(i => !i.match(/netlify|cloudinary/g));
    // TODO: need to filter out twitter icons etc;
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
        items.map((i, index) => {
          this.posts.push(new Post(i, index));
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
