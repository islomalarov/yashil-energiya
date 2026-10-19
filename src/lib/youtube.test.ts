import assert from "node:assert/strict";
import { test } from "node:test";
import { youtubeId } from "./youtube.ts";

test("youtubeId: link formats editors paste", () => {
  for (const url of [
    "https://www.youtube.com/watch?v=eboueRpCb-I",
    "https://youtube.com/watch?feature=share&v=eboueRpCb-I&t=10s",
    "https://m.youtube.com/watch?v=eboueRpCb-I",
    "https://youtu.be/eboueRpCb-I?si=abc",
    "https://www.youtube.com/shorts/eboueRpCb-I",
    "https://www.youtube.com/embed/eboueRpCb-I",
    "https://www.youtube-nocookie.com/embed/eboueRpCb-I?rel=0",
    "https://www.youtube.com/live/eboueRpCb-I",
    " youtu.be/eboueRpCb-I ",
  ]) {
    assert.equal(youtubeId(url), "eboueRpCb-I", url);
  }
});

test("youtubeId: not a video link", () => {
  for (const url of [
    undefined,
    null,
    "",
    "https://www.youtube.com/@yashilenergiya",
    "https://www.youtube.com/watch?v=short",
    "https://www.youtube.com/watch?v=eboueRpCb-I1",
    "https://evil.com/youtu.be/eboueRpCb-I",
    "https://notyoutube.com/watch?v=eboueRpCb-I",
  ]) {
    assert.equal(youtubeId(url), null, String(url));
  }
});
