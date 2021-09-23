---
title: Everything on this site
layout: layouts/page.njk
---
{%- for item in collections.all | reverse %}
- [{{ item.url }}]({{ item.url }}) ({{ item.date | date('nice') }})
{%- endfor -%}
