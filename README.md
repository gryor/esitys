Esitys
=====

Esitys is a lightweight slideshow engine based on HTML 5 and JQuery.

**Launch by opening "index.html" in a browser.**

Design
----
Esitys turns each section inside 'slides' article into full size slides.
Each slide can contain any html and thus can present anything a website could.
Slides do not have any margins or padding nor any other preset rules so the presentation maker can decide exactly how the slides look like.
Slides can be easily themed with css. Once a theme is set, you can concentrate on content.

Features
----
- Full screen slides
- Navigation
- Mobile navigation
- Progress of the presentation
- Slide anchor creation (you can link to an exact slide)
- Portable
- Fonts are resized to prevent overflowing
    - Option to only reduce or max out the size
    - Options for minimum and maximum font size


Example
----
```
<body>
	<article class="slides">
		<section>
			<h1>Page 1</h1>
			<p>This is page 1</p>
		</section>
		<section>
			<h1>Page 2</h1>
			<p>This is page 2</p>
		</section>
		<section>
			<h1>Page 3</h1>
			<p>This is page 3</p>
		</section>
	</article>
	<script>
		slides = new Slides();
	</script>
</body>
```

This will produce:
- 3 slides with progress bar on top
- Navigation with arrow keys
- Mobile navigation using header to go back and the content to go forward

License
----
AGPL v3
