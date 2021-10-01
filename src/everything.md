---
title: Everything on this site
layout: page
---
{%- for item in collections.all | reverse %}
- [{{ item.url }}]({{ item.url }}) ({{ item.date | date('nice') }})
{%- endfor -%}
