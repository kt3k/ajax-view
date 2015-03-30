# ajax-view v0.1.4

> Automatically creates a REST request, renders it with dustjs and inserts it without any JavaScript

[demo](http://kt3k.github.io/ajax-view/example.html)

# Usage

Example:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.js"></script>
<script src="https://raw.githubusercontent.com/pyrsmk/qwest/1.5.9/qwest.min.js"></script>
<script src="https://raw.githubusercontent.com/linkedin/dustjs/v2.6.0/dist/dust-full.js"></script>
<script src="https://raw.githubusercontent.com/kt3k/ajax-view/v0.1.3/ajax-view.js"></script>


<div
  data-api="https://api.github.com/users/github/repos"
  data-method="get"
  data-template="#tpl-repos"
  class="ajax-view"></div>

<script type="text/x-dustjs" id="tpl-repos">
  <ul>
    {#.}
    <li>
      <div>
        <a href="{html_url}">{full_name}</a>
        <ul>
          <li>language: {language}</li>
          <li>star: {stargazers_count}</li>
          <li>issues: {open_issues}</li>
          <li>created_at: {created_at}</li>
        </ul>
      </div>
    </li>
    {/.}
  </ul>
</script>
```

The above creates `GET` request to the endpoint `https://api.github.com/users/github/repos`, render it with template of `#tpl-repos` and insert its result into the div.


## Manual initialization

`ajax-view.js` automatically initialize `.ajax-view` elements at `$(document).ready`. If you need to initialize after that, you can do it by triggering `init.ajax-view` event on `document` element.

```js
$(document).trigger('init.ajax-view'); //=> initialize `.ajax-view` elements
```

# Events

## `loaded.ajax-view`

This is triggered when the `ajax-view` successfully gets api response and renders it.

```html
<p class="ajax-view" data-api="/api/users/1"></p>

<script>
$('.ajax-view).on('loaded.ajax-view', function () {

    console.log('.ajax-view successfully loaded!');

});
</script>
```

## `error.ajax-view'

This is triggered when the `ajax-view` fails to get response or fails to render it.

```html
<p class="ajax-view" data-api="/api/users/1"></p>

<script>
$('.ajax-view).on('error.ajax-view', function (event, error) {

    console.log('.ajax-view failed!');

    console.log(error);
    console.log(error.stack);

});
</script>
```

The second argument of handler (in jQuery style) is error object. You can inspect what was the actual error.


# Install

```sh
bower install --save ajax-view
```

# License

[MIT](https://github.com/kt3k/ajax-view/blob/master/LICENSE)
