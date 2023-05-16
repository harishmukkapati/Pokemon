# Pokemon

I used Javascript, CSS, and HTML to create a website which fetched data from the PokéAPI and parsed through the API call. This data was stored in a map so that it was quick to access collected data. Using this information, I created an aesthetic card for each Pokémon using CSS (for the look and feel) and Javascript (for the data & also to write to HTML using Javascript). I also created a modal that would appear when a Pokémon's card was clicked. This modal would provide other information regarding the specified Pokémon. The font was Open Sans, also obtained through an API call to Google Fonts (this was accomplished in the HTML and CSS). I also created a search bar at the top of the page which would be able to search for Pokémon using their Pokédex ID, name, types, and abilities. I incorporated a debounce timer into the search to make sure I knew when the user stopped typing as well. For the color of the card, I assigned it to be associated with the Pokémon's first listed type. This was also done using a map, wherein I assigned each key (type) a value (color hex-code). One of the most important points about this site was that it was responsive to the size of the window. This was extremely important in order to make the site feel more modern and increase functionality. This was accomplished through CSS through things such as display flex and other CSS features. I also incorporated animations into this site. When the cursor hovers on a Pokémon card, is slightly increases in size, darkens the box-shadow (to create an elevated effect), and begins an animation to make it feel like the Pokémon is slightly bouncing within the card. At the bottom of the page, I had a random Pokémon's sprite spin in place to portray the loading of the next batch of Pokémon. I also used the hover in CSS to make the buttons more usable, having them change color when hovered on. 

Some things I could improve on for this project is enabling multi-word search functionality, providing more relevant information within the modal, using the SVG image instead of the PNG image when available for the sprite (so that resolution of image was always high, no matter how far the user zoomed in), and also making the modal more aesthetically pleasing as well. Another imporant thing I could do is make the search faster. I could also incorporate information such as evolution timeline and other things within the modal (such as the different sprites available within the API call). I was trying this at first (as you may see with the arrow buttons at each side of the modal), but ultimately ceased progress on this project since I was satisfied with where the project was, and wanted to look into other things. 
