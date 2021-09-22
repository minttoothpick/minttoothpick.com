---
title: Everything on this site
layout: layouts/article.njk
hideDate: true
---
{%- for item in collections.all | reverse %}
- [{{ item.url }}]({{ item.url }}) ({{ item.date | date('nice') }})
{%- endfor -%}
