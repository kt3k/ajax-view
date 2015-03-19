# ajax-view v0.1.3

> Creates REST request and render with dustjs template,
> No javascript with API rendering.

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


# Install

```sh
bower install --save ajax-view
```
