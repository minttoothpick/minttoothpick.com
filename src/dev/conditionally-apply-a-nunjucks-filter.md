---
title: Conditionally apply a Nunjucks filter
---
I have a Nunjucks filter that removes everything in a string after and including the first colon. I use it for removing the subtitle from books in my currently-reading list (*Book Title: Obnoxiously Long Subtitle, As Is Common These Days* → *Book Title*). In that macro/include, I pass in a parameter to determine whether I want the long or short version of the title. You can conditionally apply a Nunjucks filter like this:

```jinja2
{% raw %}{{ book.title | removeSubtitle if noSubtitle else book.title }}{% endraw %}
```

This will output the filtered title if the `noSubtitle` variable is set; otherwise, the full title is output.
