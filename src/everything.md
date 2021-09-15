---
layout: layouts/base.njk
---
{%- for item in collections.all | reverse %}
- [{{ item.url }}]({{ item.url }}) ({{ item.date | date('nice') }})
{%- endfor -%}
