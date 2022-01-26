---
title: Testing dates
tags:
  - eleventy
---
- `date`: {{ date }}
- `page.date`: {{ page.date }}

  This is the `JSDate` format to Luxon.

- `page.date.toUTCString()`: {{ page.date.toUTCString() }}
- `page.date | date('iso')`: {{ page.date | date('iso') }}
- `page.date | date('DATE_MED')`: {{ page.date | date('DATE_MED') }}
- `page.date | date`: {{ page.date | date }}

See [Luxon's docs on `toLocaleString`](https://moment.github.io/luxon/#/formatting?id=tolocalestring-strings-for-humans) for some formatting presets.

At first, I thought I wanted to use `Last Modified` as the default date for everything. I was thinking in the context of creating a digital garden, where having a "Last Updated" date makes more sense. However, it doesn't always work on a platform like Netlify. It will be just fine to manually add an `updated` field in my YAML for this.

Instead of adding multiple date formatting filters, I made one with a parameter that specifies the format output:

```js
const { DateTime } = require("luxon");

eleventyConfig.addFilter("date", (dateObj, type) => {
  // ISO is like "2021-09-15"
  if (type === "iso") return DateTime.fromJSDate(dateObj).toISODate();
  // DATE_FULL is like "September 15, 2021"
  if (type === "nice") return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_FULL);
  // If no parameter is specified, just return unformatted date
  return dateObj;
});
```

Use the filter like so: `{% raw %}{% page.date | date('iso') %}{% endraw %}`

Sources:
- https://www.11ty.dev/docs/dates/
- https://11ty.rocks/eleventyjs/dates/
