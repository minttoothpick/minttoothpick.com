---
layout: layouts/base.njk
---
{%- for item in collections.all %}
- [{{ item.url }}]({{ item.url }})
{%- endfor -%}
