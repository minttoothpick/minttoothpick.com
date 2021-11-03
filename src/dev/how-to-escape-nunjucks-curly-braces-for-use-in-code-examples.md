---
title: How to escape Nunjucks curly braces for use in code examples
---
Say you want to demonstrate a Nunjucks code snippet on your site without actually rendering that code in your template:

```jinja2
// An example filter
{% raw %}{{ data | myFilter }}{% endraw %}
```

There are two ways to achieve this:

1. Wrap your code in a `{{ '{% raw %}' }}` block:

    ```jinja2
    {% raw %}{% raw %}
    {{ data | myFilter }}
    {% endraw %}{% endraw %}
    ```

    `{{ '{% verbatim %}{% endverbatim %}' }}` works as well.

2. But there's a simpler way for shorter code pieces:

    {% verbatim %}`{{ '{{ variable }}' }}`{% endverbatim %}

Sources:

- https://mozilla.github.io/nunjucks/templating.html#raw
- https://github.com/mozilla/nunjucks/issues/604
