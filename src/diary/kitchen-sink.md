---
title: Kitchen Sink; Also Making This Extra Long So That It’ll Wrap and I Can Check the Line Height Value
layout: layouts/article.njk
---
Lorem, ipsum dolor sit amet consectetur adip<span style="color:red;">\*</span>isicing elit. Quam suscipit nu<span style="color:red;">\*</span>lla nesciunt sint vero, accusantium error ea quidem inventore nihil numquam quos cumque, earum corporis soluta. Possimus facere placeat quaerat. Welcome to the kitchen sink. It's a handy way to test prose styles and whatnot.

<figure>

![Close up of a medieval-era illustration of a hand holding a book](media/book.jpg)

<figcaption>

Can I space out the elements and get a correct `figure` w/ Markdown image embed?

</figcaption>

</figure>

Then we have a regular body paragraph underneath. With this, text can be **bold**, *italic*, or ~~strikethrough~~. How about ==highlighting something== with <code>&lt;mark&gt;</code> as well? And [here is what a hyperlink looks like](another-page), just so you know.

There should be whitespace between paragraphs. What if we have a [link with some `code` in it?](nowhere)

<figure>
    <img alt="" src="/media/notes/Pasted%20image%2020210107164405.png">
    <figcaption>
        <p>Figures with captions will have to be hard-coded in the Markdown file.</p>
    </figcaption>
</figure>

There should be whitespace between paragraphs. We recommend including a README, or a file with information about your project.

## This is a level 2 heading, check `code` in `h2`; also Making This Extra Long So That It'll Wrap and I Can Check the Line Height Value

This is a normal paragraph following a header. GitHub is a code hosting platform for version control and collaboration. It lets you and others work together on projects from anywhere.

1. This ordered list is very exciting because it demonstrates ordered list items.
2. Following the Tailwind Typography example, we've removed list styles and reapplied counters and bullets to the list items themselves. This allows us to change their color, and line them up with the left side of the text without guessing at the padding value.
3. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

## Another level 2 heading
### With a level 3 heading right after it; Also Making This Extra Long So That It'll Wrap and I Can Check the Line Height Value

This is a normal paragraph following a list. GitHub is a code hosting platform for version control and collaboration. It lets you and others work together on projects from anywhere.

* Now, for unordered lists, it's a bit different.
* ~~The `content` value is empty, and we're inserting the bullet with a `border-radius`.~~
* ~~...actually, I changed that to insert a literal bullet, which seems to result in less math being required for placement?~~
* ...*actually*, I decided to use the `::marker` pseudoelement instead. Much simpler.
* If you have any paragraphs inside any of the list items, it seems it will render every `li` with a `p` inside of it.
* **How about a header in a list item?**

  To put another block level element inside of a list item in Markdown, be sure to indent it by two spaces. ([Source](https://www.markdownguide.org/basic-syntax/#paragraphs))

  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

* **And another item, like so**

  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

  > I think you can even have a blockquote in a list item.

* **This item will contain a paragraph, and then a nested list**

  Line break and two-space indent; I'm the paragraph.

  * With a list inside!

This is a normal paragraph following a list. There is a horizontal rule underneath. GitHub is a code hosting platform for version control and collaboration. It lets you and others work together on projects from anywhere.

---

And this paragraph follows that horizontal rule.

## Header 2

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

> This is a blockquote following a paragraph.
>
> When something is important enough, you do it even if the odds are not in your favor.

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

### Header 3

```js
// Javascript code with syntax highlighting.
var fun = function lang(l) {
  dateformat.i18n = require('./lang/' + l)
  return true;
}
```

```ruby
# Ruby code with syntax highlighting
GitHubPages::Dependencies.gems.each do |gem, version|
  s.add_dependency(gem, "= #{version}")
end
```

#### Header 4 `with code not transformed`

* This is an unordered list following a header.
* This is an unordered list following a header.
* This is an unordered list following a header.

1. This is an ordered list following a header.
2. This is an ordered list following a header.
3. This is an ordered list following a header.

Here we have a table, aren't those fun!

| head1        | head two          | three |
|--------------|-------------------|-------|
| ok           | good swedish fish | nice  |
| out of stock | good and plenty   | nice  |
| ok           | good `oreos`      | hmm   |
| ok           | good `zoute` drop | yumm  |

### And a nested list:

- level 1 item
  - level 2 item
  - level 2 item
    - level 3 item
    - level 3 item
- level 1 item
  - level 2 item
  - level 2 item
  - level 2 item
- level 1 item
  - level 2 item
  - level 2 item
- level 1 item

### Nesting an `ol` in `ul` in an `ol`

- level 1 item (ul)
  1. level 2 item (ol)
  1. level 2 item (ol)
    - level 3 item (ul)
    - level 3 item (ul)
- level 1 item (ul)
  1. level 2 item (ol)
  1. level 2 item (ol)
    - level 3 item (ul)
    - level 3 item (ul)
  1. level 4 item (ol)
  1. level 4 item (ol)
    - level 3 item (ul)
    - level 3 item (ul)
- level 1 item (ul)

<!-- ### And a task list

- [ ] Hello, this is a TODO item
- [ ] Hello, this is another TODO item
- [x] Goodbye, this item is done -->

### Small image

![](https://assets-cdn.github.com/images/icons/emoji/octocat.png)

### Large image

![](https://guides.github.com/activities/hello-world/branching.png)

<!-- ### Definition lists can be used with HTML syntax.

<dl>
<dt>Name</dt>
<dd>Godzilla</dd>
<dt>Born</dt>
<dd>1952</dd>
<dt>Birthplace</dt>
<dd>Japan</dd>
<dt>Color</dt>
<dd>Green</dd>
</dl> -->

<!-- #### Multiple description terms and values

Term
: Brief description of Term

Longer Term
: Longer description of Term,
  possibly more than one line

Term
: First description of Term,
  possibly more than one line

: Second description of Term,
  possibly more than one line

Term1
Term2
: Single description of Term1 and Term2,
  possibly more than one line

Term1
Term2
: First description of Term1 and Term2,
  possibly more than one line

: Second description of Term1 and Term2,
  possibly more than one line -->

### More code

```
Long, single-line code blocks should not wrap. They should horizontally scroll if they are too long. This line should be long enough to demonstrate this.
```

```
The final element.
```
