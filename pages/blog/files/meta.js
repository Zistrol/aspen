(function() {
	var Realmac = Realmac || {};

	Realmac.meta = {
		
		// Set the browser title
		//
		// @var String text
		setTitle: function(text) {
			return document.title = text;
		},
		
		// Set the content attribute of a meta tag
		//
		// @var String name
		// @var String content
		setTagContent: function(tag, content){
			// If the tag being set is title
			// return the result of setTitle
			if ( tag === 'title' )
			{
				return this.setTitle(content);
			}
			
			// Otherwise try and find the meta tag
			var tag = this.getTag(tag);
			
			// If we have a tag, set the content
			if ( tag !== false )
			{
				return tag.setAttribute('content', content);
			}
			
			return false;
		},
		
		// Find a meta tag
		//
		// @var String name
		getTag: function(name) {
			var meta = document.querySelectorAll('meta');
			
			for ( var i=0; i<meta.length; i++ )
			{
				if (meta[i].name == name){
					return meta[i];
				}
			}
			
			var tag = document.createElement('meta');
			tag.name = name;
			document.getElementsByTagName('head')[0].appendChild(tag);
			
			return tag;
		}
	};
 
	// Object containing all website meta info
	var websiteMeta = {"00b5f459d8eaf0331ae9186221bbbd40-2.html":"￼\n\nWe might as well make some Almighty mountains today as well, what the heck. At home you have unlimited time. All you have to do is let your imagina","category-beyond-the-trail.html":"A list of posts in category &ldquo;Beyond the Trail&rdquo;","category-camping-gear.html":"A list of posts in category &ldquo;Camping Gear&rdquo;","tag-outdoors.html":"Posts tagged &ldquo;Outdoors&rdquo;","category-good-times.html":"A list of posts in category &ldquo;Good Times&rdquo;","archive-june-2017.html":"Archives for June 2017","archive-march-2017.html":"Archives for March 2017","tag-scared-straight.html":"Posts tagged &ldquo;Scared Straight&rdquo;","tag-zen.html":"Posts tagged &ldquo;Zen&rdquo;","542f9c4ecb0e21a0f892e1d1f79a1bde-9.html":"￼\n\nYou can't make a mistake. Anything that happens you can learn to use - and make something beautiful out of it. Let your heart take you to wherever ","da7b78ba37d0e3fa0776482025282990-3.html":"￼\n\nEvery day I learn. Just relax and let it flow. That easy. Just use the old one inch brush. Put it in, leave it alone. The man who does the best job","archive-april-2017.html":"Archives for April 2017","tag-unplug.html":"Posts tagged &ldquo;Unplug&rdquo;","adcdb97adfd2eccd0c710c40af3e8045-8.html":"￼\n\nI thought today we would do a happy little picture. You have to make these big decisions. Only eight colors that you need. Everyone is going to see","category-omg.html":"A list of posts in category &ldquo;OMG&rdquo;","category-tent-life.html":"A list of posts in category &ldquo;Tent Life&rdquo;","archive-may-2017.html":"Archives for May 2017","category-camp-grounds.html":"A list of posts in category &ldquo;Camp Grounds&rdquo;","tag-at-peace.html":"Posts tagged &ldquo;At Peace&rdquo;"};
 
	// pageId must match the key in websiteMeta object
	var url = window.location.pathname;
	var pageId = url.substring(url.lastIndexOf('/')+1);
	if (!pageId || pageId.length == 0){
		pageId = 'index.html';
	}
	pageMeta = websiteMeta[pageId];
 
	// If we have meta for this page
	if (pageMeta){
		Realmac.meta.setTagContent('description', pageMeta);
	}
 
 })();